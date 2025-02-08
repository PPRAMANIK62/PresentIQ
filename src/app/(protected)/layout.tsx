import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user) redirect("/sign-in");

  return <div className="min-h-screen w-full">{children}</div>;
};

export default Layout;
