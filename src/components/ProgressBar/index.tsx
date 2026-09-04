import { useTheme } from "styled-components";
import {
  Wrapper,
  Track,
  Segment,
  Legend,
  LegendItem,
  LegendDot,
} from "./styles";
import type { ProgressBarProps } from "./type";

export const ProgressBar = ({
  mastered,
  inProgress,
  newCards,
  showLegend = false,
}: ProgressBarProps) => {
  const theme = useTheme();
  const total = mastered + inProgress + newCards || 1;

  const masteredPct = (mastered / total) * 100;
  const inProgressPct = (inProgress / total) * 100;
  const newPct = (newCards / total) * 100;

  return (
    <Wrapper>
      <Track>
        <Segment $percent={masteredPct} $color={theme.colors.primary} />
        <Segment $percent={inProgressPct} $color={theme.colors.warning} />
        <Segment $percent={newPct} $color={theme.colors.border} />
      </Track>
      {showLegend && (
        <Legend>
          <LegendItem>
            <LegendDot $color={theme.colors.primary} />
            Dominadas ({mastered ?? 0})
          </LegendItem>
          <LegendItem>
            <LegendDot $color={theme.colors.warning} />
            En progreso ({inProgress ?? 0})
          </LegendItem>
          <LegendItem>
            <LegendDot $color={theme.colors.border} />
            Nuevas ({newCards ?? 0})
          </LegendItem>
        </Legend>
      )}
    </Wrapper>
  );
};
