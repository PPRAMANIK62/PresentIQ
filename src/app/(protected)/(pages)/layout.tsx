import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user) redirect("/sign-in");

  // const recentProjects = getRecentProjects();

  return <div>{children}</div>;
};

export default Layout;
