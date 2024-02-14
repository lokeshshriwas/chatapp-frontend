import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat , setSelectedChat] = useState()
  const [chats, setChats] = useState([])
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat , setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = ()=>{
    return useContext(ChatContext)
}

export default ChatContextProvider;
