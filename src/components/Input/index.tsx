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
  registration,
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
          $hasIcon={!!icon}
          $hasError={!!error}
          {...(registration
            ? registration
            : {
                value,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange?.(e.target.value),
              })}
        />
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};
