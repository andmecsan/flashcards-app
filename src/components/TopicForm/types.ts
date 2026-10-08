import type { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import type { Difficulty } from "../../utils/difficulty";

export interface CardField {
  front: string;
  back: string;
  /** id de la tarjeta ya guardada; ausente en las nuevas. */
  cardId?: number;
  /** Etiquetas personales de la tarjeta (máx. 5). */
  tags?: string[];
}

export interface CreateTopicForm {
  name: string;
  /** Dificultad privada del temario elegida por el usuario; '' = sin definir. */
  difficulty?: Difficulty | '';
  cards: CardField[];
}

export interface CardItem {
  id: number;
  front: string;
  back: string;
  tags?: string[];
  category_id: number;
  created_at: string;
}

export interface TopicFormProps {
  mode: "create" | "edit";
  deckName?: string;
  form: UseFormReturn<CreateTopicForm>;
  fields: UseFieldArrayReturn<CreateTopicForm, "cards">["fields"];
  serverError: string;
  handleSubmit: () => void;
  handleAddCard: () => void;
  handleRemoveCard: (index: number) => void;
  handleBack: () => void;
  generating?: boolean;
  handleGenerateFromPdf?: (file: File) => void;
}
