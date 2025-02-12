"use client";

import { usePromptStore } from "@/hooks/use-prompt-store";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CreatePage from "./create-project/create-page";

const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreatePage />;
      case "create-scratch":
        return <></>;
      case "creative-ai":
        return <></>;

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderPage;
