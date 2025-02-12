"use client";

import AlertDialogBox from "@/components/global/alert-dialog-box";
import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/hooks/use-slide-store";
import { useToast } from "@/hooks/use-toast";
import { itemVariants, themes } from "@/lib/constants";
import { timeAgo } from "@/lib/timeAgo";
import { type Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { setSlides } = useSlideStore();
  const router = useRouter();
  const { toast } = useToast();

  const theme = themes.find((theme) => theme.name === themeName) ?? themes[0]!;
  // const slides = JSON.parse(JSON.stringify(slideData)) as Slide[];

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)) as Slide[]);
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Project not found",
        variant: "destructive",
      });
      return;
    }

    try {
    } catch (error) {
      console.error(error);
      return { status: 500, error: "Internal Server Error" };
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "group flex w-full flex-col gap-y-1 rounded-xl p-3 transition-colors",
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
            {title}This is a mock title given by me for now.
          </h3>
          <div className="flex w-full items-center justify-between gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {/* {isDeleted ? ( */}
            <AlertDialogBox
              description="This will recover your project and restore your data."
              className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              loading={loading}
              open={open}
              onClick={handleRecover}
              handleOpen={() => setOpen(!open)}
            >
              <Button
                size={"sm"}
                variant={"ghost"}
                className="bg-background-80 dark:hover:bg-background-70"
                disabled={loading}
              >
                Recover
              </Button>
            </AlertDialogBox>
            {/* ) : ( */}
            {/* "" */}
            {/* )} */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
