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