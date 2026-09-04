export interface LastSession {
  date: string
  cards_count: number
  success_rate: number
}

export interface NextReview {
  deck_id: number
  deck_name: string
  category_id: number
  category_name: string
  due_count: number
}

export interface StatsData {
  study_streak: number
  last_session: LastSession | null
  next_review: NextReview | null
}

export interface StatsBarProps {
  stats: StatsData
  onStudy: (deckId: number) => void
}