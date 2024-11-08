"use server";

import { Member, Photo } from "@prisma/client";
import { ActionResult } from "types";
import {
  getSessionCredentials,
  getUserIdBySessionCredentials,
} from "./statless-session";
import { editProfileSchema } from "../../../schemas/editProfileSchema";
import { cloudinary } from "./cloudinary";

export async function updateProfile(
  payload: any
): Promise<ActionResult<Member>> {
  try {
    const sessionToken = await getSessionCredentials();
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    const validated = editProfileSchema.safeParse(payload);
    if (!validated) return { status: "error", error: validated.error.errors };
    const { name, description, city, country, age } = payload;
    console.log(age);

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    });
    return { status: "success", data: member };
  } catch (err) {
    return { status: "error", error: "Something when wrong" };
  }
}

export async function uploadPhoto(url: string, publicId: string) {
  try {
    const sessionToken = await getSessionCredentials();
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    prisma.photo.updateMany({
      where: { memberId: userId },
      data: {
        url,
        publicId,
        memberId: userId,
      },
    });
    return prisma.member.update({
      where: { userId },
      data: {
        photo: {
          create: {
            url,
            publicId,
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function setAvatarPicture(photo: Photo) {
  try {
    const sessionToken = await getSessionCredentials();
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    const avatar = prisma.member.update({
      where: { userId },
      data: {
        image: photo.url,
      },
    });
    console.log(avatar)
    prisma.user.update({
      where: { id: userId },
      data: {
        image: photo.url,
      },
    });
    return avatar;
  } catch (err) {
    throw err;
  }
}

export async function deletePhotos(photo : Photo){
  try{
    const sessionToken = await getSessionCredentials();
    const { userId } = await getUserIdBySessionCredentials(sessionToken);
    cloudinary.uploader.destroy(photo.publicId, function(result) { console.log(result) });
    await prisma.user.update({
      where: { id: userId },
      data: { image: "/images/nouser.webp" },
    });

    const updatedMember = await prisma.member.update({
      where: { userId },
      data: {
        photo: {
          delete: { id: photo.id },
        },
      },
    });

    return updatedMember;
   
  }
  catch (err) {
    throw err;
  }

  

}
