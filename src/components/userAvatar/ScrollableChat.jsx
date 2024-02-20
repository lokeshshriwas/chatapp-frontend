import React, { useEffect, useRef } from "react";
import { ChatState } from "../../Context/Chatprovider";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/Chatlogic";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const bottomOfPanelRef = useRef()

  useEffect(()=>{
    if(bottomOfPanelRef.current){
      bottomOfPanelRef.current.scrollIntoView()
    }
  }, [messages])
  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt={"7px"}
                  mr={1}
                  size={"sm"}
                  cursor={"pointer"}
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#fff" : "#A1801D"
                }`,
                color: `${
                  m.sender._id === user._id ? "#000" : "#fff"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i , user._id),
                marginTop : isSameUser(messages, m , i, user._id) ? 3 : 10
              }}
            >{m.content}</span>
          </div>
        ))}
        <div ref={bottomOfPanelRef}></div>
    </div>
  );
};

export default ScrollableChat;
