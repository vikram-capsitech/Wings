import React, { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children?: ReactNode;
};

const ChatContext = createContext<any>({});

const ChatProvider = ({ children }: Props) => {
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [groups, setGroups] = useState();

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        groups,
        setGroups,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
