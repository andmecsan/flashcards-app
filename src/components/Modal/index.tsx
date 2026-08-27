import { X } from "lucide-react";
import { Overlay, Content, Header, Title, CloseButton } from "./styles";
import type { ModalProps } from "./types";

export const Modal = ({ onClose, title, children }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Content>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </Header>
        {children}
      </Content>
    </Overlay>
  );
};
