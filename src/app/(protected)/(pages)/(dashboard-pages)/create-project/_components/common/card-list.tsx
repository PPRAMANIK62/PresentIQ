"use client";

import { type OutlineCard } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import Card from "./card";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
};

const CardList = ({
  addMultipleOutlines,
  editText,
  editingCard,
  onCardDoubleClick,
  onCardSelect,
  onEditChange,
  outlines,
  selectedCard,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addOutline,
}: Props) => {
  const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;

    if (y < threshold) setDragOverIndex(index);
    else setDragOverIndex(index + 1);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || dragOverIndex == null) return;

    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedItem.id,
    );
    if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;

    const [removedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCard!,
    );

    addMultipleOutlines(
      updatedCards.map((card, index) => ({ ...card, order: index + 1 })),
    );
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const onCardUpdate = (id: string, newTitle: string) => {
    addMultipleOutlines(
      outlines.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card,
      ),
    );
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
  };

  const onCardDelete = (id: string) => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== id)
        .map((card, idx) => ({ ...card, order: idx + 1 })),
    );
  };

  return (
    <motion.div
      className="-my-2 space-y-2"
      layout
      onDragOver={(e) => {
        e.preventDefault();
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        )
          onDragOver(e, outlines.length);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e);
      }}
    >
      <AnimatePresence>
        {outlines.map((card, idx) => (
          <Fragment key={card.id}>
            <Card
              card={card}
              onDragOver={(e) => onDragOver(e, idx)}
              isEditing={editingCard === card.id}
              isSelected={selectedCard === card.id}
              editText={editText}
              onEditChange={onEditChange}
              onEditBlur={() => onCardUpdate(card.id, editText)}
              onEditKeyDown={(e) => {
                if (e.key === "Enter") onCardUpdate(card.id, editText);
              }}
              onCardClick={() => onCardSelect(card.id)}
              onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
              onDeleteClick={() => onCardDelete(card.id)}
              dragHandlers={{
                onDragStart: () => onDragStart(e, card),
                onDragEnd: onDragEnd,
              }}
            />
          </Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;
