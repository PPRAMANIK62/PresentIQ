import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { Project, User } from "@prisma/client";
import React from "react";

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
          <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
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
    </Sidebar>
  );
};

export default AppSidebar;
