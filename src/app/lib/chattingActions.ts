"use server";
import { mapMessagesToDto } from "./mapping";
import { prisma } from "../../../schemas/prisma";
import {
  getSessionCredentials,
  getUserIdBySessionCredentials,
} from "./statless-session";
import { pusherServer } from "./pusher";
import { createChatId } from "./utils";

export async function sendMessage(message: string, recipientUserId: string) {
  try {
    const sessionToken = await getSessionCredentials();
    const { userId } = await getUserIdBySessionCredentials(sessionToken);

    const createdMessage = await prisma.message.create({
      data: {
        senderId: userId,
        recipientId: recipientUserId,
        text: message,
      },
      select: {
        id: true,
        text: true,
        date: true,
        sender: {
          select: {
            userId: true, // Ensure these fields match your schema
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true, // Ensure these fields match your schema
            name: true,
            image: true,
          },
        },
      },
    });
    const mappedMessage = mapMessagesToDto(createdMessage);
    await pusherServer.trigger(
      createChatId(userId, recipientUserId),
      "message:new",
      mappedMessage
    );
    return { status: "success", data: mappedMessage };
  } catch (err) {
    return { status: "error", error: err };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const sessionToken = await getSessionCredentials(); // Assuming this gets the current session token
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    // Fetch messages between the current user and the recipient within this session
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId },
          { recipientId: userId, senderId: recipientId },
        ],
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        text: true,
        date: true,
        dateRead: true,
        sender: {
          select: {
            userId: true, // Ensure these fields match your schema
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true, // Ensure these fields match your schema
            name: true,
            image: true,
          },
        },
      },
    });

    if (messages.length > 0) {
      const readMessagesIds = messages
        .filter((m) => {
          m.dateRead === null,
            m.recipient.userId === userId,
            m.sender.userId === recipientId;
        })
        .map((m) => m.id);
      await prisma.message.updateMany({
        where: { id: { in: readMessagesIds } },
        data:{dateRead : new Date()}

      });

    }

    return messages.map((message) => mapMessagesToDto(message));
  } catch (err) {
    console.error("Error fetching message thread:", err);
    throw err;
  }
}

export async function getMessagesByContainer(container: string) {
  try {
    const sessionToken = await getSessionCredentials();
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    const selector = container === "outbox" ? "senderId" : "recipientId";
    const messages = await prisma.message.findMany({
      where: {
        [selector]: userId,
      },
      select: {
        id: true,
        text: true,
        date: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: [
        {
          date: "asc",
        },
      ],
    });

    return messages.map((message) => mapMessagesToDto(message));
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteMessage(messageId: string, isOutBox: boolean) {
  try {
    const sessionToken = await getSessionCredentials();
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    const selector = isOutBox ? "senderDeleted" : "recipientDeleted";
    const message = await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });
    console.log(userId);
    const messageToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });
    if (messageToDelete.length > 0) {
      const messageIds = messageToDelete.map((m) => m.id);
      await prisma.message.deleteMany({
        where: {
          id: { in: messageIds },
        },
      });
      console.log(`Deleted messages: ${messageIds}`);
    } else {
      console.log("No messages to delete");
    }
    return messageToDelete;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
