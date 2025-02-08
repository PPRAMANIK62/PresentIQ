"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { data } from "@/lib/constants";
import type { Project, User } from "@prisma/client";
import React from "react";
import NavMain from "./nav-main";

type Props = {
  recentProjects?: Project[];
  user: User;
};

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: Props & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[212px] bg-background/90"
      {...props}
    >
      <SidebarHeader className="px-3 pb-0 pt-6">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="size-10 rounded-full">
              <AvatarImage src="/presentiq.png" alt="presentiq-logo" />
              <AvatarFallback className="rounded-lg">PIQ</AvatarFallback>
            </Avatar>
          </div>
          <span className="truncate text-xl font-semibold text-primary">
            PresentIQ
          </span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent className="mt-10 gap-y-6 px-3">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
