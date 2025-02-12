import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Page = "create" | "creative-ai" | "create-scratch";

type PromptStore = {
  page: Page;
  setPage: (page: Page) => void;
};

export const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set) => ({
        page: "create",
        setPage: (page) => {
          set({ page });
        },
      }),
      { name: "prompts" },
    ),
  ),
);
