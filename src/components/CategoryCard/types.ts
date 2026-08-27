export interface CategoryCardProps {
  id: number
  name: string
  cardCount: number
  onClick: () => void
  onDelete: () => void
}