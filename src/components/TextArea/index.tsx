import { Wrapper, Label, StyledTextArea, ErrorText } from "./styles";
import type { TextAreaProps } from "./types";

export const TextArea = ({
  label,
  placeholder,
  error,
  registration,
  value,
  onChange,
}: TextAreaProps) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <StyledTextArea
        placeholder={placeholder}
        $hasError={!!error}
        {...(registration
          ? registration
          : {
              value,
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange?.(e.target.value),
            })}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};
