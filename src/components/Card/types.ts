export interface CardProps {
  id: number
  name: string
  cardCount: number
  dueCount: number
  onClick: () => void
  onDelete: () => void
}