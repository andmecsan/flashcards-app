import { Trash2, BookOpen } from "lucide-react";
import {
  Container,
  Header,
  DeleteButton,
  Icon,
  Body,
  Name,
  Meta,
  DueBadge,
} from "./styles";
import type { CardProps } from "./types";

export const Card = ({
  name,
  cardCount,
  dueCount,
  onClick,
  onDelete,
}: CardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Container onClick={onClick}>
      <Header>
        <DeleteButton onClick={handleDelete}>
          <Trash2 size={14} />
        </DeleteButton>
        <Icon>
          <BookOpen size={32} />
        </Icon>
      </Header>
      <Body>
        <Name>{name}</Name>
        <Meta>
          {cardCount} tarjetas
          {dueCount > 0 && <DueBadge>{dueCount} pendientes</DueBadge>}
        </Meta>
      </Body>
    </Container>
  );
};
