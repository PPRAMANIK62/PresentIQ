"use server";

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

    const existingUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });
    if (existingUser) {
      return { status: 200, user: existingUser };
    }

    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }

    return { status: 400 };
  } catch (error) {
    console.error(error);
    return { status: 500, error: "Internal Server Error" };
  }
};
