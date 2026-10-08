import { Trash2, Pencil, Star, FolderInput } from "lucide-react";
import { Button } from "../Button";
import {
  Wrapper,
  Content,
  Header,
  Body,
  Title,
  Subtitle,
  Badge,
  Actions,
} from "./styles";
import type { CardProps } from "./types";

export const Card = ({
  $variant = "default",
  title,
  $highlighted = false,
  subtitle,
  badge,
  icon,
  headerColor,
  children,
  onClick,
  onDelete,
  onEdit,
  onMove,
  isFavorite = false,
  onToggleFavorite,
}: CardProps) => {
  const hasActions = !!onDelete || !!onEdit || !!onMove || !!onToggleFavorite;

  const handleAction = (e: React.MouseEvent, handler: () => void) => {
    e.stopPropagation();
    handler();
  };

  return (
    <Wrapper $variant={$variant} onClick={onClick} $highlighted={$highlighted}>
      <Content $variant={$variant}>
        {hasActions && (
          <Actions $variant={$variant}>
            {onToggleFavorite && (
              <Button
                $variant="overlay"
                $iconOnly
                icon={<Star size={14} fill={isFavorite ? "currentColor" : "none"} />}
                aria-label={isFavorite ? "Quitar de favoritas" : "Marcar como favorita"}
                aria-pressed={isFavorite}
                title={isFavorite ? "Quitar de favoritas" : "Marcar como favorita"}
                onClick={(e) => handleAction(e, onToggleFavorite)}
              />
            )}
            {onDelete && (
              <Button
                $variant="overlay"
                $iconOnly
                icon={<Trash2 size={14} />}
                onClick={(e) => handleAction(e, onDelete)}
              />
            )}
            {onMove && (
              <Button
                $variant="overlay"
                $iconOnly
                icon={<FolderInput size={14} />}
                aria-label="Mover a otra asignatura"
                title="Mover a otra asignatura"
                onClick={(e) => handleAction(e, onMove)}
              />
            )}
            {onEdit && (
              <Button
                $variant="overlay"
                $iconOnly
                icon={<Pencil size={14} />}
                onClick={(e) => handleAction(e, onEdit)}
              />
            )}
          </Actions>
        )}
        {$variant === "default" && <Header $color={headerColor}>{icon}</Header>}
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
