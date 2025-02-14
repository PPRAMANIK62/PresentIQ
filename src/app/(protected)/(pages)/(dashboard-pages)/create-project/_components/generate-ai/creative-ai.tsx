import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreativeAIStore } from "@/hooks/use-creative-ai-store";
import { containerVariants, itemVariants } from "@/lib/constants";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CardList from "../common/card-list";

type Props = {
  onBack: () => void;
};

const CreativeAI = ({ onBack }: Props) => {
  const [noOfCards, setNoOfCards] = useState<number>(0);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  const router = useRouter();
  const {
    currentAIPrompt,
    setCurrentAIPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAIStore();

  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");

    setCurrentAIPrompt("");
    resetOutlines();
  };

  // TODO:
  // const generateOutline = () => {}

  return (
    <motion.div
      className="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={onBack} variant={"outline"} className="mb-4">
        <ChevronLeft className="mr-2 size-4" /> Back
      </Button>
      <motion.div variants={itemVariants} className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-presentiq">Creative AI</span>
        </h1>
        <p className="text-secondary">What would you like to build today?</p>
      </motion.div>
      <motion.div
        className="rounded-xl bg-primary/10 p-4"
        variants={itemVariants}
      >
        <div className="flex flex-col items-center justify-between gap-3 rounded-xl sm:flex-row">
          <Input
            placeholder="Enter prompt and add to the cards..."
            className="flex-grow border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 sm:text-xl"
            value={currentAIPrompt}
            onChange={(e) => setCurrentAIPrompt(e.target.value)}
            required
          />
          <div className="flex items-center gap-3">
            <Select
              value={noOfCards.toString()}
              onValueChange={(value) => setNoOfCards(parseInt(value))}
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards"></SelectValue>
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
      <div className="flex w-full items-center justify-center">
        <Button
          className="flex items-center gap-2 text-lg font-medium"
          // onClick={generateOutline}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 animate-spin" /> Generating...
            </>
          ) : (
            "Generate Outline"
          )}
        </Button>
      </div>

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
    </motion.div>
  );
};

export default CreativeAI;
