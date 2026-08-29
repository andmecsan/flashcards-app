import { StyledButton, Content } from "./styles";
import type { ButtonProps } from "./types";

export const Button = ({
  $variant,
  $size,
  $soft,
  $fullWidth,
  icon,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={$variant}
      $size={$size}
      $soft={$soft}
      $fullWidth={$fullWidth}
      {...rest}
    >
      <Content>
        {icon}
        {children}
      </Content>
    </StyledButton>
  );
};
