"use client";

import { usePromptStore } from "@/hooks/use-prompt-store";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
