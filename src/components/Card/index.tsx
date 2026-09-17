import { Trash2, Pencil } from "lucide-react";
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
}: CardProps) => {
  const hasActions = !!onDelete || !!onEdit;

  const handleAction = (e: React.MouseEvent, handler: () => void) => {
    e.stopPropagation();
    handler();
  };

  return (
    <Wrapper $variant={$variant} onClick={onClick} $highlighted={$highlighted}>
      <Content $variant={$variant}>
        {hasActions && (
          <Actions $variant={$variant}>
            {onDelete && (
              <Button
                $variant="overlay"
                $iconOnly
                icon={<Trash2 size={14} />}
                onClick={(e) => handleAction(e, onDelete)}
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
