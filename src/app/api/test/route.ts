import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request)   
 {
  try {
    const data = await request.json();
    // Process the data here
    return NextResponse.json({ data: "new data" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to parse request body' }, { status: 500 });
  }
}

export async function GET(){
    return NextResponse.json({
        products: [
            {id:1}
        ]
    })
}
