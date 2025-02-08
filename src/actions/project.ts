"use server";

import { db } from "@/server/db";
import { onAuthenticateUser } from "./user";

export const getAllProjects = async () => {
  try {
    const user = await onAuthenticateUser();
    if (user?.status !== 200 || !user.user) {
      return { status: 403, error: "User not authenticated!" };
    }

    const projects = await db.project.findMany({
      where: {
        userId: user.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (projects.length === 0) {
      return { status: 404, error: "No projects found!" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.error(error);
    return { status: 500, error: "Internal Server Error" };
  }
};
