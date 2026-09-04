export interface DeckStatsData {
  total_cards: number
  due_today: number
  mastered: number
  in_progress: number
  new_cards: number
  success_rate: number | null
  next_review: {
    category_id: number
    category_name: string
    due_count: number
  } | null
}

export interface DeckStatsProps {
  stats: DeckStatsData
  deckId: number
}