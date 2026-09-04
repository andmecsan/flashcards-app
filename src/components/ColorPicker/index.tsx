import { Wrapper, Label, Grid, ColorButton } from "./styles";
import type { ColorPickerProps } from "./types";

const COLORS = [
  "#7C3AED",
  "#2563EB",
  "#0F6E56",
  "#5DCAA5",
  "#EF9F27",
  "#E24B4A",
  "#EC4899",
  "#F97316",
  "#6366F1",
  "#1E293B",
];

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <Wrapper>
      <Label>Color</Label>
      <Grid>
        {COLORS.map((color) => (
          <ColorButton
            key={color}
            $color={color}
            $selected={value === color}
            onClick={() => onChange(color)}
            type="button"
          />
        ))}
      </Grid>
    </Wrapper>
  );
};
