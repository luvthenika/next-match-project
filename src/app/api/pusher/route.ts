import { getSession } from "app/lib/statless-session";
import { pusherServer } from "../../lib/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const session = getSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  const socketId = "191811.205736";
  const channel = "presence-nm";
  const data = {
    user_id: "qwhsdghwoei34856",
  };
  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  console.log(authResponse)
  return new NextResponse(
    JSON.stringify({ success: true, data: authResponse }),
    { status: 200 }
  );
}
