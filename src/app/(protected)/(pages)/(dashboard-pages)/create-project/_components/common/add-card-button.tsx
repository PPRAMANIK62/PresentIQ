import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  onAddCard: () => void;
};

const AddCardButton = ({ onAddCard }: Props) => {
  const [showGap, setShowGap] = useState<boolean>(false);

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ height: "0.5rem" }}
      animate={{
        height: showGap ? "2rem" : "0.5rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <div className="h-[1px] w-[40%] bg-primary" />
      <Button
        variant={"outline"}
        size={"sm"}
        className="size-8 rounded-full bg-primary p-0 hover:bg-primary"
        onClick={onAddCard}
        aria-label="Add new card"
      >
        <Plus className="size-4 text-black" />
      </Button>
      <div className="h-[1px] w-[40%] bg-primary" />
    </motion.div>
  );
};

export default AddCardButton;
