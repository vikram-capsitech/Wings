import { Persona, PersonaPresence, PersonaSize, Stack } from "@fluentui/react";
import React, { useEffect, useRef, useState } from "react";
import { LocalStorage, requestHandler } from "../Utils";
import { useParams } from "react-router-dom";
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from "../Interfaces/chat";
import { useAuth } from "../Context/AuthContext";
import ScrollableChat from "./ScrollableChat";
import { getChatMessages, sendMessage } from "../Api";
import { useSocket } from "../Context/SocketContext";
import ChatInput from "./ChatInput";
import { ChatState } from "../Context/ChatProvider";
import animationData from "../Animations/Typing.json";
import { Player } from "@lottiefiles/react-lottie-player";

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";

const ChatPannel = ({ fetchAgain, setFetchAgain }: any) => {
  const { chats, setChats } = ChatState();
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { socket } = useSocket();

  // Create a reference using 'useRef' to hold the currently selected chat.
  // 'useRef' is used here because it ensures that the 'currentChat' value within socket event callbacks
  // will always refer to the latest value, even if the component re-renders.
  const currentChat = useRef<ChatListItemInterface | null>(null);

  // To keep track of the setTimeout function
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define state variables and their initial values using 'useState'
  const [isConnected, setIsConnected] = useState(false); // For tracking socket connection
  const [messages, setMessages] = useState<ChatMessageInterface[]>([]); // To store chat messages
  const [unreadMessages, setUnreadMessages] = useState<ChatMessageInterface[]>(
    []
  ); // To track unread messages

  const [isTyping, setIsTyping] = useState(false); // To track if someone is currently typing
  const [selfTyping, setSelfTyping] = useState(false); // To track if the current user is typing

  const [message, setMessage] = useState(""); // To store the currently typed message

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]); // To store files attached to messages
  const { clientId } = useParams();

  /**
   *  A  function to update the last message of a specified chat to update the chat list
   */
  const updateChatLastMessage = (
    chatToUpdateId: string,
    message: ChatMessageInterface // The new message to be set as the last message
  ) => {
    // Search for the chat with the given ID in the chats array
    const chatToUpdate = chats.find(
      (chat: { _id: string }) => chat._id === chatToUpdateId
    )!;

    // Update the 'lastMessage' field of the found chat with the new message
    chatToUpdate.lastMessage = message;

    // Update the 'updatedAt' field of the chat with the 'updatedAt' field from the message
    chatToUpdate.updatedAt = message?.updatedAt;

    // Update the state of chats, placing the updated chat at the beginning of the array
    setChats([
      chatToUpdate, // Place the updated chat first
      ...chats.filter((chat: { _id: string }) => chat._id !== chatToUpdateId), // Include all other chats except the updated one
    ]);
  };

  const getMessages = async () => {
    // Check if a chat is selected, if not, show an alert
    if (!currentChat.current?._id) return alert("No chat is selected");

    // Check if socket is available, if not, show an alert
    if (!socket) return alert("Socket not available");

    // Emit an event to join the current chat
    socket.emit(JOIN_CHAT_EVENT, currentChat.current?._id);

    // Filter out unread messages from the current chat as those will be read
    setUnreadMessages(
      unreadMessages.filter((msg) => msg.chat !== currentChat.current?._id)
    );

    // Make an async request to fetch chat messages for the current chat
    requestHandler(
      // Fetching messages for the current chat
      async () => await getChatMessages(currentChat.current?._id || ""),
      // Set the state to loading while fetching the messages
      null,
      // After fetching, set the chat messages to the state if available
      (res) => {
        const { data } = res;
        setMessages(data || []);
        setFetchAgain(!fetchAgain);
      },
      // Display any error alerts if they occur during the fetch
      alert
    );
  };

  // Function to send a chat message
  const sendChatMessage = async () => {
    // If no current chat ID exists or there's no socket connection, exit the function
    if (!currentChat.current?._id || !socket) return;

    // Emit a STOP_TYPING_EVENT to inform other users/participants that typing has stopped
    socket.emit(STOP_TYPING_EVENT, currentChat.current?._id);

    // Use the requestHandler to send the message and handle potential response or error
    await requestHandler(
      // Try to send the chat message with the given message and attached files
      async () =>
        await sendMessage(
          currentChat.current?._id || "", // Chat ID or empty string if not available
          message, // Actual text message
          attachedFiles // Any attached files
        ),
      null,
      // On successful message sending, clear the message input and attached files, then update the UI
      (res) => {
        setMessage(""); // Clear the message input
        setAttachedFiles([]); // Clear the list of attached files
        setMessages((prev) => [res.data, ...prev]); // Update messages in the UI
        updateChatLastMessage(currentChat.current?._id || "", res.data); // Update the last message in the chat
      },

      // If there's an error during the message sending process, raise an alert
      alert
    );
  };

  const handleOnMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the message state with the current input value
    setMessage(e.target.value);
    console.log(isConnected);
    // If socket doesn't exist or isn't connected, exit the function
    if (!socket) return;

    // Check if the user isn't already set as typing
    if (!selfTyping) {
      // Set the user as typing
      setSelfTyping(true);

      // Emit a typing event to the server for the current chat
      socket.emit(TYPING_EVENT, currentChat.current?._id);
    }

    // Clear the previous timeout (if exists) to avoid multiple setTimeouts from running
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Define a length of time (in milliseconds) for the typing timeout
    const timerLength = 3000;

    // Set a timeout to stop the typing indication after the timerLength has passed
    typingTimeoutRef.current = setTimeout(() => {
      // Emit a stop typing event to the server for the current chat
      socket.emit(STOP_TYPING_EVENT, currentChat.current?._id);

      // Reset the user's typing state
      setSelfTyping(false);
    }, timerLength);
  };

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  /**
   * Handles the "typing" event on the socket.
   */
  const handleOnSocketTyping = (chatId: string) => {
    // Check if the typing event is for the currently active chat.
    if (chatId !== currentChat.current?._id) return;

    // Set the typing state to true for the current chat.
    setIsTyping(true);
  };

  /**
   * Handles the "stop typing" event on the socket.
   */
  const handleOnSocketStopTyping = (chatId: string) => {
    // Check if the stop typing event is for the currently active chat.
    if (chatId !== currentChat.current?._id) return;

    // Set the typing state to false for the current chat.
    setIsTyping(false);
  };

  /**
   * Handles the event when a new message is received.
   */
  const onMessageReceived = (message: ChatMessageInterface) => {
    // Check if the received message belongs to the currently active chat
    if (message?.chat !== currentChat.current?._id) {
      // If not, update the list of unread messages
      setUnreadMessages((prev) => [message, ...prev]);
    } else {
      // If it belongs to the current chat, update the messages list for the active chat
      setMessages((prev) => [message, ...prev]);
    }

    // Update the last message for the chat to which the received message belongs
    updateChatLastMessage(message.chat || "", message);
  };

  const onNewChat = (chat: ChatListItemInterface) => {
    setChats((prev: any) => [chat, ...prev]);
  };

  // This function handles the event when a user leaves a chat.
  const onChatLeave = (chat: ChatListItemInterface) => {
    // Check if the chat the user is leaving is the current active chat.
    if (chat._id === currentChat.current?._id) {
      // If the user is in the group chat they're leaving, close the chat window.
      currentChat.current = null;
      // Remove the currentChat from local storage.
      LocalStorage.remove("currentChat");
    }
    // Update the chats by removing the chat that the user left.
    setChats((prev: any[]) => prev.filter((c) => c._id !== chat._id));
  };

  // Function to handle changes in group name
  const onGroupNameChange = (chat: ChatListItemInterface) => {
    // Check if the chat being changed is the currently active chat
    if (chat._id === currentChat.current?._id) {
      // Update the current chat with the new details
      currentChat.current = chat;

      // Save the updated chat details to local storage
      LocalStorage.set("currentChat", chat);
    }

    // Update the list of chats with the new chat details
    setChats((prev: any[]) => [
      // Map through the previous chats
      ...prev.map((c) => {
        // If the current chat in the map matches the chat being changed, return the updated chat
        if (c._id === chat._id) {
          return chat;
        }
        // Otherwise, return the chat as-is without any changes
        return c;
      }),
    ]);
  };

  useEffect(() => {
    // Retrieve the current chat details from local storage.
    const _currentChat = LocalStorage.get("currentChat");

    // If there's a current chat saved in local storage:
    if (_currentChat) {
      // Set the current chat reference to the one from local storage.
      currentChat.current = _currentChat;
      // If the socket connection exists, emit an event to join the specific chat using its ID.
      socket?.emit(JOIN_CHAT_EVENT, _currentChat.current?._id);
      // Fetch the messages for the current chat.
      getMessages();
    }
    // An empty dependency array ensures this useEffect runs only once, similar to componentDidMount.
  }, [clientId]);

  // This useEffect handles the setting up and tearing down of socket event listeners.
  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;

    // Set up event listeners for various socket events:
    // Listener for when the socket connects.
    socket.on(CONNECTED_EVENT, onConnect);
    // Listener for when the socket disconnects.
    socket.on(DISCONNECT_EVENT, onDisconnect);
    // Listener for when a user is typing.
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    // Listener for when a user stops typing.
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    // Listener for when a new message is received.
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    // Listener for the initiation of a new chat.
    socket.on(NEW_CHAT_EVENT, onNewChat);
    // Listener for when a user leaves a chat.
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    // Listener for when a group's name is updated.
    socket.on(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);

    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      socket.off(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);
    };

    // Note:
    // The `chats` array is used in the `onMessageReceived` function.
    // We need the latest state value of `chats`. If we don't pass `chats` in the dependency array,
    // the `onMessageReceived` will consider the initial value of the `chats` array, which is empty.
    // This will not cause infinite renders because the functions in the socket are getting mounted and not executed.
    // So, even if some socket callbacks are updating the `chats` state, it's not
    // updating on each `useEffect` call but on each socket call.
  }, [socket, chats]);

  return (
    <>
      <Stack style={{ backgroundColor: "#ffffff", height: "100dvh" }} grow>
        <Stack
          horizontal
          style={{
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <SingleChatHeader
            refresh={shouldRefresh}
            onRefresh={() => {
              setShouldRefresh(false);
            }}
          />
          <Stack
            style={{
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              scrollbarWidth: "none",
              height: "auto",
              justifyContent: "space-between",
              marginTop: 5,
              marginLeft: "7%",
              paddingRight: "5%",
              width: "90%",
            }}
          >
            <ScrollableChat messages={messages} />
          </Stack>
          <Stack style={{}} id="first-name">
            {isTyping && (
              <Stack
                style={{
                  marginLeft: "7%",
                  paddingRight: "5%",
                }}
              >
                <Player
                  src={animationData}
                  className="player"
                  loop
                  autoplay
                  style={{
                    height: "80px",
                    width: "110px",
                    marginBottom: "-33px",
                    marginLeft: "-15px",
                  }}
                />
              </Stack>
            )}
            <Stack
              style={{
                paddingBottom: 10,
                paddingTop: 10,
                marginLeft: "7%",
                paddingRight: "5%",
                width: "90%",
              }}
            >
              <ChatInput
                value={""}
                handleSendMsg={() => {
                  sendChatMessage();
                }}
                onChange={handleOnMessageChange}
                handleFile={(file: any) => {
                  setAttachedFiles([...attachedFiles, file]);
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default ChatPannel;

const SingleChatHeader = ({ refresh, onRefresh }: any) => {
  const { user, token } = useAuth();
  const { clientId } = useParams();

  const [receiver, setReceiver] = React.useState<{
    id: any;
    name: string;
    email: string;
    pic: any;
  }>({ id: "", email: "", name: "", pic: "" });

  React.useEffect(() => {
    const getUserDetail = () => {
      const value: any = JSON.parse(localStorage.getItem("currentChat") as any);
      if (value) {
        const rece = value.participants.filter((u: any) => {
          if (u._id !== user?._id) return u;
        });
        setReceiver(() => ({
          email: rece[0].email,
          id: rece[0]._id,
          name: rece[0].username,
          pic: rece[0].pic,
        }));
      }
    };
    getUserDetail();
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, user, token, refresh]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 5px",
        borderBottom: "1px solid",
        borderColor: "#e5e5e5",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginLeft: 10, width: 50 }}>
          <Persona
            style={{ cursor: "pointer" }}
            imageUrl={receiver?.pic}
            size={PersonaSize.size40}
            presence={PersonaPresence.online}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <label style={{ lineHeight: 1, fontWeight: 500, fontSize: 16 }}>
            {receiver?.name}
          </label>
          <label
            style={{
              lineHeight: 1,
              fontSize: 12,
              color: "#9BA4B5",
              cursor: "pointer",
              marginLeft: 2,
            }}
          >
            {receiver?.email}
          </label>
        </div>
      </div>
      <div style={{ marginRight: 10 }}>
        {/* <FontIcon
          iconName="MoreVertical"
          style={{ cursor: "pointer" }}
          className={mergeStyles({
            fontSize: 18,
            fontWeight: 600,
            ":hover": {
              color: "red",
            },
          })}
        /> */}
      </div>
    </div>
  );
};
