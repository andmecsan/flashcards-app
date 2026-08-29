export interface ConfirmModalProps {
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onClose: () => void
}