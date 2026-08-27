import { StyledButton } from "./styles";
import type { ButtonProps } from "./types";

export const Button = ({
  $variant,
  $size,
  $fullWidth,
  children,
  onClick,
  disabled,
  type,
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={$variant}
      $size={$size}
      $fullWidth={$fullWidth}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
};
