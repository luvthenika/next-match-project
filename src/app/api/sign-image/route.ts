import { v2 as cloudinary } from "cloudinary";

export async function POST(request: Request) {
    const body = await request.json();
    const { paramsToSign } = body;
    console.log(body);
  
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!
    );
  
    return Response.json({ signature });
  }