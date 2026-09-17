export interface Deck {
  id: number
  name: string
  icon: string
  color: string
  card_count: number
  due_count: number
  mastered: number
  in_progress: number
  new_cards: number
  created_at: string
}

export interface DecksResponse {
  decks: Deck[]
  meta: { page: number; per_page: number; total: number; total_pages: number }
}