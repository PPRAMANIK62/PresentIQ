"use client";

import { Button } from "@/components/ui/button";
import { Card as UICard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type OutlineCard } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useRef } from "react";

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (value: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  dragHandlers: {
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyles: React.CSSProperties;
};

const Card = ({
  card,
  dragHandlers,
  dragOverStyles,
  editText,
  isEditing,
  isSelected,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  onDragOver,
  onEditBlur,
  onEditChange,
  onEditKeyDown,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
      className="relative"
    >
      <div
        draggable
        onDragOver={onDragOver}
        style={dragOverStyles}
        {...dragHandlers}
      >
        <UICard
          className={cn(
            "cursor-grab bg-primary-90 p-4 active:cursor-grabbing",
            {
              "border-primary bg-transparent": isEditing || isSelected,
            },
          )}
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
        >
          <div className="flex items-center justify-between">
            {isEditing ? (
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => onEditChange(e.target.value)}
                onBlur={onEditBlur}
                onKeyDown={onEditKeyDown}
                className="text-base sm:text-lg"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-xl bg-primary-20 px-4 py-1 text-base sm:text-lg",
                    {
                      "bg-secondary-90 dark:text-black":
                        isEditing || isSelected,
                    },
                  )}
                >
                  {card.order}
                </span>
                <span className="text-base sm:text-lg">{card.title}</span>
              </div>
            )}

            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
              aria-label={`Delete card ${card.order}`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </UICard>
      </div>
    </motion.div>
  );
};

export default Card;
