import { type Slide, type Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";

type Props = {
  slide: Slide;
  theme: Theme;
};

const ThumbnailPreview = ({ slide, theme }: Props) => {
  // TODO: Add a preview of the slide

  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden rounded-lg p-2 transition-all duration-200",
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.backgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="size-[200%] origin-top-left scale-[0.5] overflow-hidden">
          This is the slide
        </div>
      ) : (
        <div className="flex size-full items-center justify-center bg-gray-400">
          <Image className="size-6 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
