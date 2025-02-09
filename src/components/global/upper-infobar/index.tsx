import ThemeSwitcher from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { type User } from "@prisma/client";
import { UploadIcon } from "lucide-react";
import NewProjectButton from "./new-project-button";
import SearchBar from "./upper-info-searchbar";

type Props = {
  children: React.ReactNode;
  user: User;
};

const UpperInfoBar = ({ children, user }: Props) => {
  return (
    <header className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 bg-background p-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex w-full max-w-[95%] flex-wrap items-center justify-between gap-4">
        <SearchBar />
        {/* TODO: Search Throttling */}
        <ThemeSwitcher />
        <div className="flex flex-wrap items-center justify-end gap-4">
          <Button className="cursor-not-allowed rounded-lg bg-primary-80 font-semibold text-primary hover:bg-background-80">
            <UploadIcon /> Import
          </Button>
          <NewProjectButton user={user} />
        </div>
      </div>
    </header>
  );
};

export default UpperInfoBar;
