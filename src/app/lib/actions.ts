"use server";
import { prisma } from "../../../schemas/prisma";
import { loginSchema, LoginSchema } from "../../../schemas/loginSchema";
import { SignUpSchema, signUpSchema } from "../../../schemas/RegistrationSchema";
import { ActionResult } from "../../types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "./statless-session";
import { redirect } from "next/navigation";
import usePresenceStore from "app/hooks/usePresenceStore";

export async function registerUser(
  data: SignUpSchema
): Promise<ActionResult<User>> {
  try {
    const validated = signUpSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }
    const { fullName, username, email, password } = validated.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) return { status: "error", error: "User already exist" };

    const createdUser = await prisma.user.create({
      data: {
        fullName,
        username,
        email,
        passwordHash: hashedPassword,
        image: null,
      },
    });
    const member = await prisma.member.create({
      data: {
        userId: createdUser.id,
        name: createdUser.fullName,
        gender: "Unspecified",
        dateOfbirth: new Date(), // Could default to current date or leave as null
        description: "No description provided",
        city: "No city specified",
        country: "No country specified",
      },
    });
    return { status: "success", data: createdUser };
  } catch (error) {
    return { status: "error", error: "Something went wrong!" };
  }
}

export async function loginUser(payload: LoginSchema) {
  try {
    const validated = loginSchema.safeParse(payload);
    if (!validated.success) {
      return { status: "error", error: "Invalid credentials" };
    }

    const { email, password } = validated.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return { status: "error", error: "User does not exist" };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!isPasswordValid) {
      return { status: "error", error: "Invalid password" , id: existingUser.id};
    }

    const sessionToken: string = await createSession(existingUser.id);

    const existingSession = await prisma.session.findFirst({
      where: { userId: existingUser.id },
    });


    if (existingSession) {
      await prisma.session.update({
        where: { sessionToken: existingSession?.sessionToken },
        data: {
          sessionToken: sessionToken,
          expires: new Date(Date.now() + 3600000), // 1 hour from now (adjust as needed)
        },
      });
    } else {
      if (sessionToken) {
        await prisma.session.create({
          data: {
            sessionToken: sessionToken,
            userId: existingUser.id,
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now (adjust as needed)
          },
        });
        console.log("session is stored to db");
      }
    }
       
    return { status: "success", message: "User logged in successfully!" , id:existingUser.id };
  } catch (err) {
    console.error("Login error:", err);
    return { status: "error", message: "An error occurred during login" };
  }
}

export async function logOut() {
  try {
    const deletedSession = await deleteSession();
    return { status: "success", message: "User logged out sucessfully" };
  } catch (err) {
    return { status: "error", message: "There are problems with logging out" };
  }
}
