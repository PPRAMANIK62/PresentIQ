"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  items: {
    title: string;
    url: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    // icon: string;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
};

const NavMain = ({ items }: Props) => {
  const pathname = usePathname();

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={cn(
                pathname.includes(item.url) && "bg-muted",
                "m-0 py-0",
              )}
            >
              <Link
                href={item.url}
                className={cn(
                  "text-lg",
                  pathname.includes(item.url) && "font-bold",
                )}
              >
                <item.icon className="text-lg" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
