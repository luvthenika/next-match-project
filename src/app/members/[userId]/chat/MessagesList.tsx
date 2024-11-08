"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageDTO } from "types";
import MessageBox from "./MessageBox";
import { pusherClient } from "app/lib/pusher";
import { formatDate } from "date-fns";
import { createChatId, createShortDateFormat } from "app/lib/utils";
import { Channel } from "pusher-js";
import { useParams } from "next/navigation";
import { find } from "lodash";
import usePresenceStore from "app/hooks/usePresenceStore";
import {
  AblyProvider,
  ChannelProvider,
  useAbly,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import Ably from "ably";

type Props = {
  newMessages: MessageDTO[];
  userId: string;
  chatId: string;
};

const MessagesList = ({ newMessages, userId, chatId }: Props) => {
  console.log(chatId);
  let ch;



  const membersStore = usePresenceStore((state) => state.members);
  const addMembers = usePresenceStore((state) => state.add);
  const channelRef = useRef<Channel | null>(null);
  const setReadCount = useRef(false);
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState(newMessages);
  const messageTextIsEmpty = messageText.trim().length === 0;
  return (
        <div>
          {receivedMessages.map((message) => {
            return <p key={message.id}>{message.text}</p>;
          })}
          {receivedMessages.length === 0
            ? "No messages to display"
            : newMessages.map((m) => (
                <MessageBox message={m} key={m.id} currentUserId={userId} />
              ))}
        </div>

  );
};

export default MessagesList;
