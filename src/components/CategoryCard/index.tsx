import { Trash2 } from "lucide-react";
import {
  Card,
  Actions,
  IconButton,
  Name,
  CardCount,
  StudyButton,
} from "./styles";
import type { CategoryCardProps } from "./types";

export const CategoryCard = ({
  name,
  cardCount,
  onClick,
  onDelete,
}: CategoryCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Card onClick={onClick}>
      <Actions>
        <IconButton onClick={handleDelete}>
          <Trash2 size={14} />
        </IconButton>
      </Actions>
      <Name>{name}</Name>
      <CardCount>{cardCount} tarjetas</CardCount>
      <StudyButton>Ver tarjetas</StudyButton>
    </Card>
  );
};
