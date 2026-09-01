export interface StudySessionCard {
  id: number
  front: string
  back: string
  category: string
}

export interface StudySessionProps {
  cards: StudySessionCard[]
  loading: boolean
  emptyTitle?: string
  emptyMessage?: string
  completedTitle?: string
  completedMessage?: string
  showSkip?: boolean
  onRate: (cardId: number, quality: number) => void
  onExit: () => void
}