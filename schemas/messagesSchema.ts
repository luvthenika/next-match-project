import { z } from "zod";
export const chatMessageSchema = z.object({
    text: z.string().min(1).max(500),  
  });
export type ChatMessageSchema = z.infer<typeof chatMessageSchema>
