import type { Difficulty } from '../../utils/difficulty'

export interface Category {
  id: number
  name: string
  deck_id: number
  card_count: number
  difficulty?: Difficulty | null
  created_at: string
}