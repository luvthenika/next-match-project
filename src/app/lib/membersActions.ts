"use server";

import { Photo } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "../../../schemas/prisma";

export async function getMembers() {
  try {
    const sessionToken = cookies().get("session")?.value;
    if (sessionToken) {
      const userSession = await prisma.session.findFirst({
        where: { sessionToken: sessionToken },
      });

      if (userSession) {
        const users = await prisma.member.findMany({
          where: {
            userId: {
              not: userSession.userId,
            },
          },
        });
        return users;
      } else {
        console.log("user is not authenticated!!!");
      }
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getMemberById(userId: string) {
  return prisma.member.findUnique({
    where: { userId },
  });
}

export async function getPhotosByUserId(userId: string) {
  const member = await prisma.member.findUnique({
    where: { userId },
    select: { photo: true },
  });
  if (!member) return null;
  return member.photo.map((p) => p) as Photo[];
}
