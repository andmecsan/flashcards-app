import type { UseFormReturn } from "react-hook-form";
import type { CardField, CreateTopicForm } from "../components/TopicForm/types";

export const getValidTopicCards = (
  form: UseFormReturn<CreateTopicForm>,
  cards: CardField[],
): CardField[] | null => {
  const validCards = cards.filter((c) => c.front.trim() || c.back.trim());
  const invalidCards = validCards.some((c) => !c.front.trim() || !c.back.trim());

  if (invalidCards) {
    form.setError("cards", { message: "Todas las tarjetas deben tener pregunta y respuesta" });
    return null;
  }

  if (validCards.length === 0) {
    form.setError("cards", { message: "Añade al menos una tarjeta" });
    return null;
  }

  return validCards;
};
