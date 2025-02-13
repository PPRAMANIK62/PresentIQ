import { type OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreativeAIStore = {
  outlines: OutlineCard[] | [];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  currentAIPrompt: string;
  setCurrentAIPrompt: (prompt: string) => void;
};

export const useCreativeAIStore = create<CreativeAIStore>()(
  persist(
    (set) => ({
      currentAIPrompt: "",
      setCurrentAIPrompt: (prompt: string) => {
        set({ currentAIPrompt: prompt });
      },
      outlines: [],
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      addMultipleOutlines: (outlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...outlines],
        }));
      },
    }),
    {
      name: "creative-ai",
    },
  ),
);
