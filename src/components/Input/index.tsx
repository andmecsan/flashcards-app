import {
  Wrapper,
  Label,
  InputWrapper,
  Icon,
  StyledInput,
  ErrorText,
} from "./styles";
import type { InputProps } from "./types";

export const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  icon,
}: InputProps) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {icon && <Icon>{icon}</Icon>}
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          $hasIcon={!!icon}
          $hasError={!!error}
        />
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};
