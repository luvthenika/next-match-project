"use server";
import { cookies } from "next/headers";
import { getSession } from "./statless-session";
import { use } from "react";

export async function likeMember(targetId: string, isLiked: boolean) {
  try {
    const userId = await getUserId();
    if (isLiked) {
      await prisma.likes.deleteMany({
        where: {
          AND: [{ sourceUserId: userId }, { targetUserId: targetId }],
        },
      });
    } else {
      await prisma.likes.create({
        data: {
          sourceUserId: userId,
          targetUserId: targetId,
        },
      });
    }
  } catch (err) {
    throw err;
  }
}
export async function getUserId() {
  const session = await getSession();
  const sessionToken = cookies().get("session")?.value;
  console.log("session token", sessionToken);

  if (!sessionToken) {
    throw new Error("Session token not found");
  }

  const sessionData = await prisma.session.findUnique({
    where: {
      sessionToken: sessionToken,
    },
    select: { userId: true },
  });

  if (!sessionData) {
    throw new Error("No user found");
  }

  const { userId } = sessionData;
  console.log("user id", userId);

  if (!userId) {
    throw new Error("No user found");
  }

  return userId;
}

export async function fetchCurrentUsersLikes() {
  try {
    const userId = await getUserId();
    console.log(`us id ${userId}`);
    const likes = await prisma.likes.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });
    console.log("likes ", likes);
    return likes.map((like) => like.targetUserId);
  } catch (err) {
    throw err;
  }
}

export async function fetchLikedMembers(type = "source") {
  try {
    const userid = await getUserId();
    switch (type) {
      case "source":
        return await getSourceLikes(userid);
      case "target":
        return await getTargetLikes(userid);
      case "source":
        return await getMutualLikes(userid);
    }
  } catch (err) {
    throw err;
  }
}
export async function getSourceLikes(userId: string) {
  const sourceList = await prisma.likes.findMany({
    where: {
      sourceUserId: userId,
    },
    select: { targetMember: true },
  });
  return sourceList.map((e) => e.targetMember);
}

export async function getTargetLikes(userId: string) {
  const targetList = await prisma.likes.findMany({
    where: {
      targetUserId: userId,
    },
    select: { sourceMember: true },
  });
  return targetList.map((e) => e.sourceMember);
}
export async function getMutualLikes(userId: string) {
  const targetList = await prisma.likes.findMany({
    where: {
      sourceUserId: userId,
    },
    select: { targetUserId: true },
  });
  const targetListArray = targetList.map((e) => e.targetUserId);
  const mutualList = await prisma.likes.findMany({
    where: {
      AND: [
        { sourceUserId: { in: targetListArray } },
        { targetUserId: userId },
      ],
    },
    select: {
      sourceMember: true,
    },
  });
  return mutualList.map((e) => e.sourceMember);
}
