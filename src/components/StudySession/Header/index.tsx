import { RotateCcw } from "lucide-react";
import { Progress, CategoryLabel, CardHeader as Header } from "./styles";
import type { StudySessionHeaderProps } from "./types";
import { Button } from "../../Button";

export const CardHeader = ({
  progress,
  total,
  categoryName,
  onFlip,
  onFlipLabel,
}: StudySessionHeaderProps) => {
  return (
    <Header>
      <Progress>
        {progress}/{total}
      </Progress>
      <CategoryLabel>{categoryName}</CategoryLabel>
      <Button $variant="link" icon={<RotateCcw size={16} />} onClick={onFlip}>
        {onFlipLabel}
      </Button>
    </Header>
  );
};
