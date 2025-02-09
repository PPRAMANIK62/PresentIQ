"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { type User } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  prismaUser: User;
};

const NavFooter = ({ prismaUser }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isLoaded || !isSignedIn) redirect("/sign-in");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col items-start gap-y-6 group-data-[collapsible=icon]:hidden">
          {!prismaUser.subscription && (
            <div className="flex flex-col items-start gap-4 rounded-xl bg-background-80 p-2 pb-3">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-presentiq">Creative AI</span>
                </p>
                <span className="text-sm dark:text-secondary">
                  Unlock all features including AI and more
                </span>
              </div>

              <div className="w-full rounded-full bg-presentiq-gradient p-[1px]">
                <Button
                  className="border-presentiq w-full rounded-full bg-background-80 font-bold text-primary hover:bg-background-20"
                  variant={"default"}
                  size={"lg"}
                >
                  {loading ? "Upgrading..." : "Upgrade"}
                </Button>
              </div>
            </div>
          )}

          <SignedIn>
            <SidebarMenuButton
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user.fullName}</span>
                <span className="truncate text-secondary">
                  {user.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
