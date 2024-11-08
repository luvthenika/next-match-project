import { ZodIssue } from "zod";
import { Prisma } from "@prisma/client";

export type ActionResult<T> = {status: 'success' , data : T} |  {status: 'error' , error :string | ZodIssue[] }

export type MessageWithSenderAndRecipient = Prisma.MessageGetPayload<{
    select : {
        id: true,
        text: true,
        date:true
        sender : {select : { userId , name , image},}
        recipient : {select : { userId , name , image}}
    }
}>

export type MessageDTO = {
    id : string ,
    text : string ,
    date : string , 
    dateRead: string,
    senderId: string,
    senderName: string,
    senderImage? : string | null , 
    recipientId: string,
    recipientName: string,
    recipientImage? : string | null , 
    senderDeleted : boolean
    recipientDeleted : boolean
    
}
