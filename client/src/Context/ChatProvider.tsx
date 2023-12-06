import React, { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children?: ReactNode;
};

interface ILastMessageType {
  _id: string;
  sender: {
    _id: string;
    username: string;
    email: string;
  };
  content: string;
  attachments: any[];
  chat: string;
  reactions: string[];
  createdAt: string;
  updatedAt: string;
}

interface IParticipantsType {
  _id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  pic: string;
  isEmailVerified: boolean;
  updatedAt: string;
}
interface IChatType {
  admin: string;
  createdAt: string;
  isGroupChat: boolean;
  lastMessage: ILastMessageType;
  name: string;
  participants: IParticipantsType[];
  updatedAt: string;
  _id: string;
}

const ChatContext = createContext<any>({});

const ChatProvider = ({ children }: Props) => {
  const [selectedChat, setSelectedChat] = useState<IChatType>();
  const [notification, setNotification] = useState<ILastMessageType[]>([]);
  const [chats, setChats] = useState<IChatType>();
  const [groups, setGroups] = useState<IChatType>();

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
