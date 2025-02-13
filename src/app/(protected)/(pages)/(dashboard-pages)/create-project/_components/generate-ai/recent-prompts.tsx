import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePromptStore } from "@/hooks/use-prompt-store";
import { containerVariants, itemVariants } from "@/lib/constants";
import { motion } from "framer-motion";

type Props = {};

const RecentPrompt = (props: Props) => {
  const { prompts, setPage } = usePromptStore();

  const handleEdit = (id: string) => {};

  return (
    <motion.div variants={containerVariants} className="!mt-20 space-y-4">
      <motion.h2
        variants={itemVariants}
        className="text-center text-2xl font-semibold"
      >
        Your Recent Prompts
      </motion.h2>
      <motion.div
        variants={containerVariants}
        className="mx-auto w-full space-y-2 lg:max-w-[80%]"
      >
        {/* {prompts.map((prompt) => ( */}
        <motion.div key={prompt.id} variants={itemVariants}>
          <Card className="flex items-center justify-between p-4 transition-colors duration-300 hover:bg-accent/50">
            <div className="max-w-[70%]">
              <h3 className="line-clamp-1 text-xl font-semibold">
                {/* {prompt.title} */}
                This is the title
              </h3>
              <p className="text-sm font-semibold text-muted-foreground">
                {/* {timeAgo(prompt.createdAt)}  */}2 days ago
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-presentiq text-sm">Creative AI</span>
              <Button
                size={"sm"}
                className="rounded-xl bg-primary-20 text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => handleEdit(prompt.id)}
              >
                Edit
              </Button>
            </div>
          </Card>
        </motion.div>
        {/* ))} */}
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompt;
