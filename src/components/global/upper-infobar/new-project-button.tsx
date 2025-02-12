"use client";

import { Button } from "@/components/ui/button";
import { type User } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

const NewProjectButton = ({ user }: Props) => {
  const router = useRouter();

  return (
    <Button
      className="rounded-lg font-semibold"
      // disabled={!user.subscription}
      onClick={() => router.push("/create-project")}
      // TODO: handle click new project
    >
      <PlusIcon /> New Project
    </Button>
  );
};

export default NewProjectButton;
