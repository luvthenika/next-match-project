"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { MessageDTO } from "types";
import { getMessagesByContainer } from "app/lib/chattingActions";
import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "app/lib/chattingActions";

const MessagesTable = () => {
  const params = useSearchParams();
  const isOutBox = params.get("container") === "outbox";
  const [messages, setMessages] = useState([]);
  const [isDeleting , setDeletion] = useState({id : '' , loading : false});
  const container = params.get("container") || "inbox";
  const router = useRouter();
  const columns = [
    {
      key: isOutBox ? "recipientName" : "senderName",
      label: isOutBox ? "Recipient" : "Sender",
    },
    { key: "text", label: "Message" },
    { key: "date", label: "Date" },
    {key : "actions" , label : "Actions"}
  ];
  function handleRowClick(key: string) {
    const message = messages.find((m) => m.id === key);
    const url = isOutBox
      ? `/members/${message.recipientId}/`
      : `/members/${message.senderId}/`;
    router.push(url + "chat");
  }
  const renderCell = useCallback((item : MessageDTO ,  columnKey : keyof MessageDTO) => {
    const cellValue = item[columnKey];
    console.log(cellValue);
    switch(columnKey) {
        case 'recipientName' :
        case 'senderName' : 
        return (
            <div className={!isOutBox && !item.dateRead ? 'font-semibold' : ''}>
            <Avatar alt="Image of member" src={isOutBox ? item.recipientImage : item.senderImage} className=""></Avatar>
                <span>{cellValue}</span>
            </div>
        )
        case 'text' : 
        return (
            <div className={!isOutBox && !item.dateRead ? 'font-semibold' : ''}>
            {cellValue}
            </div>
        )
        case 'date' : 
        return (
            <div className={!isOutBox && !item.dateRead ? 'font-semibold' : ''}>
            {cellValue}
            </div>
        )
        default : 
        return (
            <Button isIconOnly onClick={() => handleMessageDeletion(item)} isLoading={isDeleting.loading}>
                <AiFillDelete size={24} className="text-danger color-transperent"></AiFillDelete>
            </Button>
        )
    }

  }, [])
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessagesByContainer(container);
        setMessages(fetchedMessages);
        console.log(messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);


  const handleMessageDeletion = async (message : MessageDTO) => {
    setDeletion({id : message.id , loading : true})
    await deleteMessage(message.id , isOutBox);
    router.refresh();
    setDeletion({id : '' , loading : false})
    console.log('clicked')
  }
  return (
    <Card className="flex flex-col gap-2 h-[80vh] overflow-auto mt-3 ">
      <Table
        isStriped
        aria-label="Messages"
        onRowAction={(key) => handleRowClick(key)}
        className="mt-3 mr-3 ml-2"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={messages} emptyContent="no messages yet">
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {columns.map((columnKey) => (
                <TableCell key={columnKey.key}>
                    <div className={!isOutBox && !item.dateRead ? 'font-semibold' : ''}>
                        {renderCell(item ,columnKey.key as keyof MessageDTO )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MessagesTable;
