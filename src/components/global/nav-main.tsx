"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  items: {
    title: string;
    url: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
};

const NavMain = (props: Props) => {
  const pathname = usePathname();

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip={"TEST"}
            className={cn(pathname.includes("TEST") && "bg-background/80")}
          >
            <Link
              href={"TEST"}
              className={cn(
                "text-lg",
                pathname.includes("TEST") && "font-bold",
              )}
            >
              <Clock className="text-lg" />
              <span>Test sidebar item</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
