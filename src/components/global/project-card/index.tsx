"use client";

import { useSlideStore } from "@/hooks/use-slide-store";
import { itemVariants, themes } from "@/lib/constants";
import { timeAgo } from "@/lib/timeAgo";
import { type Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted?: boolean;
  slideData: JsonValue;
  src: string;
  themeName?: string;
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDeleted,
  slideData,
  src,
  themeName,
}: Props) => {
  const { setSlides } = useSlideStore();
  const router = useRouter();

  const theme = themes.find((theme) => theme.name === themeName) ?? themes[0]!;
  // const slides = JSON.parse(JSON.stringify(slideData)) as Slide[];

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)) as Slide[]);
    router.push(`/presentation/${projectId}`);
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "group flex w-full flex-col gap-y-3 rounded-xl p-3 transition-colors",
        {
          "hover:bg-muted/50": !isDeleted,
        },
      )}
    >
      <div
        className="relative aspect-[16/10] cursor-pointer overflow-hidden rounded-lg"
        onClick={handleNavigation}
      >
        <ThumbnailPreview
          theme={theme}
          // TODO: add slide data
          // slide={slides[0]!}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-base font-semibold text-primary">
            {title}
          </h3>
          <div className="flex w-full items-center justify-between gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
