"use client";

import { createProject } from "@/actions/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScratchStore } from "@/hooks/use-scratch-store";
import { useSlideStore } from "@/hooks/use-slide-store";
import { useToast } from "@/hooks/use-toast";
import { containerVariants, itemVariants } from "@/lib/constants";
import { type OutlineCard } from "@/lib/types";
import { motion } from "framer-motion";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CardList from "../common/card-list";

type Props = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {
  const [editText, setEditText] = useState<string>("");
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();
  const { outlines, resetOutlines, addOutline, addMultipleOutlines } =
    useScratchStore();
  const { setProject } = useSlideStore();

  const handleBack = () => {
    resetOutlines();
    onBack();
  };

  const resetCards = () => {
    setEditText("");
    resetOutlines();
  };

  const handleAddCard = () => {
    const newCard: OutlineCard = {
      id: uuidv4(),
      title: editText || "New Section",
      order: outlines.length + 1,
    };
    setEditText("");
    addOutline(newCard);
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one card to generate PPT",
        variant: "destructive",
      });
      return;
    }

    const res = await createProject(outlines[0]?.title ?? "Untitled", outlines);
    if (res.status !== 200) {
      toast({
        title: "Error",
        description: res.error ?? "Failed to create project.",
        variant: "destructive",
      });
      return;
    }
    if (res.data) {
      setProject(res.data);
      resetOutlines();
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
      router.push(`/presentation/${res.data.id}/select-theme`);
    } else {
      toast({
        title: "Error",
        description: "Failed to create project!",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant={"outline"} className="mb-4">
        <ChevronLeft className="mr-2 size-4" /> Back
      </Button>
      <h1 className="text-left text-2xl font-bold text-primary sm:text-3xl">
        Prompt
      </h1>
      <motion.div
        className="rounded-xl bg-primary/10 p-4"
        variants={itemVariants}
      >
        <div className="flex flex-col items-center justify-between gap-3 rounded-xl sm:flex-row">
          <Input
            placeholder="Enter prompt and add to the cards..."
            className="flex-grow border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 sm:text-xl"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            required
          />
          <div className="flex items-center gap-3">
            <Select
              value={outlines.length > 0 ? outlines.length.toString() : "0"}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlines.length },
                    (_, idx) => idx + 1,
                  ).map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="font-semibold"
                    >
                      {num} {num === 1 ? "Card" : "Cards"}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              variant={"destructive"}
              onClick={resetCards}
              size={"icon"}
              aria-label="Reset cards"
            >
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />
      <Button
        onClick={handleAddCard}
        variant={"secondary"}
        className="w-full bg-primary-10"
      >
        Add Card
      </Button>

      {outlines.length > 0 && (
        <Button className="w-full" onClick={handleGenerate}>
          Generate PPT
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
