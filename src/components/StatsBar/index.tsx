import { Flame, Clock, Zap } from "lucide-react";
import { useTheme } from "styled-components";
import { Button } from "../Button";
import type { StatsBarProps } from "./types";
import {
  Wrapper,
  TopRow,
  StatSection,
  StatIcon,
  StatInfo,
  StatValue,
  StatLabel,
  BottomRow,
  ReviewInfo,
} from "./styles";

export const StatsBar = ({ stats, onStudy }: StatsBarProps) => {
  const theme = useTheme();

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "hace menos de 1h";
    if (hours < 24) return `hace ${hours}h`;
    const days = Math.floor(hours / 24);
    return `hace ${days} ${days === 1 ? "día" : "días"}`;
  };

  return (
    <Wrapper>
      <TopRow>
        <StatSection>
          <StatIcon $bg={theme.colors.warningLight}>
            <Flame size={18} color={theme.colors.warning} />
          </StatIcon>
          <StatInfo>
            <StatValue>
              {stats.study_streak} {stats.study_streak === 1 ? "día" : "días"}
            </StatValue>
            <StatLabel>Racha de estudio</StatLabel>
          </StatInfo>
        </StatSection>

        <StatSection>
          <StatIcon $bg={theme.colors.accentLight}>
            <Clock size={18} color={theme.colors.accent} />
          </StatIcon>
          <StatInfo>
            {stats.last_session ? (
              <>
                <StatValue>{timeAgo(stats.last_session.date)}</StatValue>
                <StatLabel>
                  {stats.last_session.cards_count} tarjetas ·{" "}
                  {stats.last_session.success_rate}% éxito
                </StatLabel>
              </>
            ) : (
              <>
                <StatValue>Sin sesiones</StatValue>
                <StatLabel>Aún no has estudiado</StatLabel>
              </>
            )}
          </StatInfo>
        </StatSection>
      </TopRow>

      <BottomRow>
        {stats.next_review ? (
          <>
            <ReviewInfo>
              <Zap size={14} />
              {stats.next_review.deck_name} → {stats.next_review.category_name}{" "}
              ({stats.next_review.due_count} pendientes)
            </ReviewInfo>
            <Button
              $size="sm"
              onClick={() => onStudy(stats.next_review!.deck_id)}
            >
              Estudiar
            </Button>
          </>
        ) : (
          <ReviewInfo>
            ¡Vas al día! No tienes tarjetas pendientes. Puedes repasar algún
            tema o dejarlo por hoy.
          </ReviewInfo>
        )}
      </BottomRow>
    </Wrapper>
  );
};
