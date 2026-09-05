import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { Button } from "../Button";
import type { DeckStatsProps } from "./types";
import {
  Wrapper,
  Grid,
  StatCard,
  StatValue,
  StatLabel,
  ProgressWrapper,
  ProgressHeader,
  ProgressLabel,
  ReviewBanner,
  ReviewInfo,
} from "./styles";
import { ProgressBar } from "../ProgressBar";

export const DeckStats = ({ stats, deckId }: DeckStatsProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Grid>
        <StatCard>
          <StatValue>{stats.total_cards}</StatValue>
          <StatLabel>Tarjetas</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue
            $color={
              stats.due_today > 0 ? theme.colors.warning : theme.colors.success
            }
          >
            {stats.due_today}
          </StatValue>
          <StatLabel>Pendientes hoy</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue $color={theme.colors.primary}>
            {stats.success_rate !== null ? `${stats.success_rate}%` : "—"}
          </StatValue>
          <StatLabel>Tasa de éxito</StatLabel>
        </StatCard>
      </Grid>

      <ProgressWrapper>
        <ProgressHeader>
          <ProgressLabel>Progreso del mazo</ProgressLabel>
        </ProgressHeader>
        <ProgressBar
          mastered={stats.mastered}
          inProgress={stats.in_progress}
          newCards={stats.new_cards}
          showLegend
        />
      </ProgressWrapper>

      {stats.next_review && (
        <ReviewBanner>
          <ReviewInfo>
            <Zap size={14} />
            {stats.next_review.category_name} — {stats.next_review.due_count}{" "}
            pendientes
          </ReviewInfo>
          <Button $size="sm" onClick={() => navigate(`/study/${deckId}`)}>
            Estudiar
          </Button>
        </ReviewBanner>
      )}
    </Wrapper>
  );
};
