"use client";
import { Avatar } from "@nextui-org/react";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { MessageDTO } from "types";

type Props = {
  message: MessageDTO;
  currentUserId: string;
};
const MessageBox = ({ message, currentUserId }: Props) => {
  const isCurrentSender = currentUserId === message.senderId;

  const lastMessageRef  = useRef<HTMLDivElement>();

  const renderAvatar = () => {
    return (
      <Avatar
        isBordered
        name={message.senderName}
        
        src={message.senderImage}
      />
    );
  };
  const messagesClasses = clsx("flex flex-col w-[50%] px-2 py-1", {
    "rounded-l-xl rounded-tr-xl text-grey-900 bg-blue-100": isCurrentSender,
    "rounded-r-xl rounded-tl-xl border-grey bg-green-100": !isCurrentSender,
  });
  const renderMessageHeader = () => (
    <p className="text-small font-bold text-pink-700">
        {isCurrentSender && message.senderName}
        {!isCurrentSender && message.senderName}
    </p>
  );

  const renderMessageText = () => {
    return (
      <div className={messagesClasses}>
        {renderMessageHeader()}
        <p className="text-sm py-3 text-grey-900">{message.text}</p>
        {renderMessageDate()}

      </div>
    );
  };

  const renderMessageDate = () => (
    <p className="flex justify-end mt-2 text-xs text-gray-400">
      {message.date}
    </p>
  );
  useEffect(()=>{
    if(lastMessageRef.current) lastMessageRef.current.scrollIntoView({behavior: "smooth"})
  },[lastMessageRef])
  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentSender,
          "justify-start text-left": !isCurrentSender,
        })}
      >
        {!isCurrentSender && renderAvatar()}
        {renderMessageText()}
        {isCurrentSender && renderAvatar()}
      </div>
      <div ref={lastMessageRef}></div>
    </div>
  );
};

export default MessageBox;
