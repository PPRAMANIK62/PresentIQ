"use client";

import { Button } from "@/components/ui/button";
import { usePromptStore } from "@/hooks/use-prompt-store";
import {
  containerVariants,
  CreatePageCard,
  itemVariants,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import RecentPrompt from "../generate-ai/recent-prompts";

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
  const { prompts, setPage } = usePromptStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-primary">
          How would you like to get started?
        </h1>
        <p className="text-secondary">Choose your preffered method to begin</p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={cn(
              "rounded-xl p-[1px] transition-all duration-200 ease-in-out",
              {
                "bg-presentiq-gradient": option.highlight,
                "border hover:bg-presentiq-gradient": !option.highlight,
              },
            )}
          >
            <motion.div
              className="flex w-full flex-col items-start gap-y-6 rounded-xl bg-white p-4 dark:bg-black"
              whileHover={{
                transition: { duration: 0.1 },
              }}
            >
              <div className="flex w-full flex-col items-start gap-y-3">
                <div>
                  <p className="text-lg font-semibold text-primary">
                    {option.title}
                  </p>
                  <p
                    className={cn("text-4xl font-bold", {
                      "text-presentiq": option.highlight,
                      "text-primary": !option.highlight,
                    })}
                  >
                    {option.highlightedText}
                  </p>
                </div>
                <p className="text-sm font-normal text-secondary">
                  {option.description}
                </p>
              </div>
              <motion.div
                className="self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={option.highlight ? "default" : "outline"}
                  size={"sm"}
                  onClick={() => onSelectOption(option.type)}
                >
                  {option.highlight ? "Generate" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {prompts.length > 0 && <RecentPrompt />}
    </motion.div>
  );
};

export default CreatePage;
