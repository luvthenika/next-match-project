"use server";
import { SignJWT, jwtVerify } from "jose";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const token = await encrypt({ userId, expiresAt });
  cookies().set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: "/",
  });
  return token;
}

export async function getSession() {
  const cookie = cookies().get("session")?.value;
  if (cookie) {
    return true;
  } else {
    return false;
  }
}

export async function verifySession() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: Number(session.userId) };
}

export async function updateSession() {
  "use server";
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    path: "/",
  });
}

export async function deleteSession(): Promise<ResponseCookies> {
  const deletedCookies = cookies().delete("session");
  const response = redirect("/");
  return deletedCookies;
}

export async function getSessionCredentials() {
  return cookies().get("session")?.value;
}

export async function getUserIdBySessionCredentials(sessionToken: string) {
  return prisma.session.findUnique({
    where: {
      sessionToken: sessionToken,
    },
    select: {
      userId: true,
    },
  });
}
