import { Trash2, Pencil, BookOpen } from "lucide-react";
import {
  Wrapper,
  Content,
  Header,
  Body,
  Title,
  Subtitle,
  Badge,
  Actions,
  ActionButton,
} from "./styles";
import type { CardProps } from "./types";

export const Card = ({
  $variant = "default",
  title,
  subtitle,
  badge,
  icon,
  children,
  onClick,
  onDelete,
  onEdit,
}: CardProps) => {
  const hasActions = !!onDelete || !!onEdit;

  const handleAction = (e: React.MouseEvent, handler: () => void) => {
    e.stopPropagation();
    handler();
  };

  return (
    <Wrapper $variant={$variant} onClick={onClick}>
      <Content $variant={$variant}>
        {hasActions && (
          <Actions $variant={$variant}>
            {onDelete && (
              <ActionButton $danger onClick={(e) => handleAction(e, onDelete)}>
                <Trash2 size={14} />
              </ActionButton>
            )}
            {onEdit && (
              <ActionButton onClick={(e) => handleAction(e, onEdit)}>
                <Pencil size={14} />
              </ActionButton>
            )}
          </Actions>
        )}
        {$variant === "default" && (
          <Header>{icon || <BookOpen size={32} />}</Header>
        )}
        <Body $variant={$variant}>
          <Title $variant={$variant}>{title}</Title>
          {subtitle && (
            <Subtitle $variant={$variant}>
              {subtitle}
              {badge && <Badge>{badge}</Badge>}
            </Subtitle>
          )}
          {children}
        </Body>
      </Content>
    </Wrapper>
  );
};
