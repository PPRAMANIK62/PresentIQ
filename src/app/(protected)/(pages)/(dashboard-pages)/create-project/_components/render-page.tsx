"use client";

import { usePromptStore } from "@/hooks/use-prompt-store";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CreatePage from "./create-project/create-page";
import ScratchPage from "./scratch/scratch-page";
import CreativeAI from "./generate-ai/creative-ai";

const RenderPage = () => {
  const router = useRouter();
  const { page, setPage } = usePromptStore();

  const handleSelectOption = (option: string) => {
    if (option === "template") router.push("/templates");
    else if (option === "create-scratch") setPage("create-scratch");
    else setPage("creative-ai");
  };

  const handleBack = () => setPage("create");

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreatePage onSelectOption={handleSelectOption} />;
      case "creative-ai":
        return <CreativeAI onBack={handleBack} />;
      case "create-scratch":
        return <ScratchPage onBack={handleBack} />;

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
