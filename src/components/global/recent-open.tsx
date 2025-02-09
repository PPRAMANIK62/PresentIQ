"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSlideStore } from "@/hooks/use-slide-store";
import { useToast } from "@/hooks/use-toast";
import { type Slide } from "@/lib/types";
import { type Project } from "@prisma/client";
import { type JsonValue } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const { setSlides } = useSlideStore();

  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      toast({
        title: "Project not found",
        description: "Please try again",
        variant: "destructive",
      });
    }

    setSlides(JSON.parse(JSON.stringify(slides)) as Slide[]);
    router.push(`/presentation/${projectId}`);
  };

  return recentProjects?.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.map((project) => (
          <SidebarMenuItem key={project.id}>
            <SidebarMenuButton
              asChild
              tooltip={project.title}
              className="hover:bg-primary/80"
            >
              <Button
                variant={"link"}
                className="items-center justify-start text-xs"
                onClick={() => handleClick(project.id, project.slides)}
              >
                <span>{project.title}</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ) : (
    ""
  );
};

export default RecentOpen;
