import React from "react";
import CardInnerWrapper from "components/CardInnerWrapper";
import ChatForm from "components/ChatForm";
import { getMessageThread } from "app/lib/chattingActions";
import {
  getSessionCredentials,
  getUserIdBySessionCredentials,
} from "app/lib/statless-session";
import MessagesList from "./MessagesList";
import { createChatId } from "app/lib/utils";

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const token = await getSessionCredentials();
  let currentUserId;
  let messages;
  let chatId;
  let filteredMessages;
  if (token) {
    currentUserId = await getUserIdBySessionCredentials(token);
    messages = await getMessageThread(params.userId);
    filteredMessages = messages.filter((m) => {
      console.log(m.recipientId);
      console.log(params.userId);
      return m.recipientId === params.userId || m.recipientId === currentUserId.userId
    });
    
    console.log('recipient' , params.userId)
    chatId = createChatId(currentUserId.userId , params.userId)
  }
  return (
    <CardInnerWrapper
      header="Chat"
      body={<MessagesList newMessages={filteredMessages} userId={currentUserId.userId} chatId={chatId}/>}
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
