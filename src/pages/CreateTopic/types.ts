export interface CardField {
  front: string
  back: string
}

export interface CreateTopicForm {
  name: string
  cards: CardField[]
}

export interface CardItem {
  id: number
  front: string
  back: string
  category_id: number
  created_at: string
}