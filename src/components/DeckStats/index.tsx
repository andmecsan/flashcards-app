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
  ProgressTrack,
  ProgressSegment,
  ProgressLegend,
  LegendItem,
  LegendDot,
  ReviewBanner,
  ReviewInfo,
} from "./styles";

export const DeckStats = ({ stats, deckId }: DeckStatsProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const total = stats.total_cards || 1;
  const masteredPct = (stats.mastered / total) * 100;
  const inProgressPct = (stats.in_progress / total) * 100;
  const newPct = 100 - masteredPct - inProgressPct;

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
        <ProgressTrack>
          <ProgressSegment
            $percent={masteredPct}
            $color={theme.colors.primary}
          />
          <ProgressSegment
            $percent={inProgressPct}
            $color={theme.colors.warning}
          />
          <ProgressSegment $percent={newPct} $color={theme.colors.border} />
        </ProgressTrack>
        <ProgressLegend>
          <LegendItem>
            <LegendDot $color={theme.colors.primary} />
            Dominadas ({stats.mastered ?? 0})
          </LegendItem>
          <LegendItem>
            <LegendDot $color={theme.colors.warning} />
            En progreso ({stats.in_progress ?? 0})
          </LegendItem>
          <LegendItem>
            <LegendDot $color={theme.colors.border} />
            Nuevas ({stats.new_cards ?? 0})
          </LegendItem>
        </ProgressLegend>
      </ProgressWrapper>

      {stats.next_review && (
        <ReviewBanner>
          <ReviewInfo>
            <Zap size={14} />
            {stats.next_review.category_name} — {stats.next_review.due_count}{" "}
            pendientes
          </ReviewInfo>
          <Button
            $size="sm"
            onClick={() =>
              navigate(
                `/decks/${deckId}/review/${stats.next_review!.category_id}`,
              )
            }
          >
            Repasar
          </Button>
        </ReviewBanner>
      )}
    </Wrapper>
  );
};
