"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { chatMessageSchema } from "../../schemas/messagesSchema";
import { ChatMessageSchema } from "../../schemas/messagesSchema";
import { Button, Input } from "@nextui-org/react";
import { HiPaperAirplane } from "react-icons/hi2";
import { useRouter ,useParams } from "next/navigation";
import { sendMessage } from "app/lib/chattingActions";
import { ErrorMessage } from "@hookform/error-message";


const ChatForm = () => {
    const router = useRouter();
    const params = useParams<{userId : string}>();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
        formState: { errors , isValid} ,
  } = useForm<ChatMessageSchema>({
    resolver: zodResolver(chatMessageSchema),
  });
  const onSubmit = async (data : ChatMessageSchema) => {
    try{
      const result = await sendMessage(data.text , params.userId);
      console.log(result)
      if(result.status === 'success') {
          reset();
          router.refresh();
          setFocus("text");
      }
    }
    catch(err){
      console.log('error here')
      console.log(err.message);
    }
   
  }
  React.useEffect(() => {
    setFocus("text")
  }, [setFocus])
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center justify-center gap-2 ">
        <Input
          fullWidth
          {...register("text", { required: true, maxLength: 20 })}
          placeholder="Type a message..."
          errorMessage={errors.text?.message}
          className="pb-2 pl-2"
        />
          <ErrorMessage errors={errors} color='white' name="text" as="p" />
        <Button type="submit" isIconOnly className="mb-2 mr-2 bg-pink-500">
        <HiPaperAirplane size={18} />            
        </Button>
      </form>
    </div>
  );
};

export default ChatForm;
