import { z } from "zod";

 export const  editProfileSchema = z.object({
    name: z.string().min(1 , {message: 'Your name is too short'}),
    description: z.string(),
    city: z.string().min(1, {message: 'City is required'}),
    country: z.string().min(1, {message: 'Country is required'}),
    
})