import { Modal } from "../Modal";
import { Button } from "../Button";
import { Message, Actions } from "./styles";
import type { ConfirmModalProps } from "./types";

export const ConfirmModal = ({
  title,
  message,
  confirmLabel = "Eliminar",
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  return (
    <Modal title={title} onClose={onClose}>
      <Message>{message}</Message>
      <Actions>
        <Button $variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button $variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Actions>
    </Modal>
  );
};
