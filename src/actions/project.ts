"use server";

import { db } from "@/server/db";
import { onAuthenticateUser } from "./user";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser?.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated!" };
    }

    const projects = await db.project.findMany({
      where: {
        userId: checkUser.user.id,
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

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser?.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated!" };
    }

    const projects = await db.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    });
    if (projects.length === 0) {
      return { status: 404, error: "No recent projects available!" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.error(error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser?.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated!" };
    }

    const updatedProject = await db.project.update({
      where: { id: projectId },
      data: { isDeleted: false },
    });
    if (!updatedProject) {
      return { status: 500, error: "Failed to recover project!" };
    }

    return { status: 200, data: updatedProject };
  } catch (error) {
    console.error(error);
    return { status: 500, error: "Internal Server Error" };
  }
};
