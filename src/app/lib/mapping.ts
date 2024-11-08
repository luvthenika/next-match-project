import { Message } from "@prisma/client";
import { date } from "zod";
import { createShortDateFormat } from "./utils";
import { MessageWithSenderAndRecipient } from "types";

export function mapMessagesToDto(message: any) {
  return {
    id: message.id,
    text: message.text,
    date : createShortDateFormat(message.date),
    senderId: message.sender?.userId,
    senderName: message.sender?.name,
    senderImage : message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientName: message.recipient?.name,
    recipientImage : message.recipient?.image,
    
  }
}
