import { StyledButton, Content } from "./styles";
import type { ButtonProps } from "./types";

export const Button = ({
  $variant,
  $size,
  $soft,
  $fullWidth,
  $iconOnly,
  icon,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={$variant}
      $size={$size}
      $soft={$soft}
      $iconOnly={$iconOnly}
      $fullWidth={$fullWidth}
      {...rest}
    >
      <Content>
        {icon}
        {!$iconOnly ? children : undefined}
      </Content>
    </StyledButton>
  );
};
