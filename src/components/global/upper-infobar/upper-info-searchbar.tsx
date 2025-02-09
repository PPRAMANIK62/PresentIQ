import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative flex min-w-[60%] items-center rounded-full border bg-primary-90">
      <Button
        type="submit"
        size={"sm"}
        variant={"ghost"}
        className="absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent"
      >
        <Search className="size-4" />
        <span className="sr-only">Search</span>
      </Button>
      <Input
        type="text"
        placeholder="Search by title"
        className="ml-6 flex-grow border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchBar;
