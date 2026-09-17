import type { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";

export interface CardField {
  front: string;
  back: string;
}

export interface CreateTopicForm {
  name: string;
  cards: CardField[];
}

export interface CardItem {
  id: number;
  front: string;
  back: string;
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
