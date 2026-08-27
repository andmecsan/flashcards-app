import { Wrapper, Spinner, Message } from "./styles";
import type { LoaderProps } from "./types";

export const Loader = ({ message = "Cargando..." }: LoaderProps) => {
  return (
    <Wrapper>
      <Spinner />
      <Message>{message}</Message>
    </Wrapper>
  );
};
