export interface CreateDeckModalProps {
  onClose: () => void
  onCreated?: (id: number) => void
  deck?: {
    id: number
    name: string
    icon: string
    color: string
  }
}

export interface DeckFormData {
  name: string
  icon: string
  color: string
}