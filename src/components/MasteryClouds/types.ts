export interface MasteryEntry {
  id: number
  name: string
  /** Asignatura del temario, o la de la etiqueta con más tarjetas (puede faltar). */
  deck_id: number | null
  deck_name: string | null
  reviews: number
  /** Porcentaje de aciertos (0-100). */
  success_rate: number
  mastered: number
  total_cards: number
  /** Peso medio de dificultad por repaso (0-2). */
  weakness: number
  /** Media entre acierto y dominio (0-1). */
  strength: number
}

export interface MasteryData {
  weak: MasteryEntry[]
  strong: MasteryEntry[]
  total_reviews: number
  min_reviews: number
}

/** Qué representa cada palabra de la nube. */
export type MasteryGroup = 'category' | 'tag'

export interface MasteryCloudsProps {
  /** Ranking por temario. */
  data: MasteryData
  /** Ranking por etiqueta personal; si no hay repasos con etiquetas, no se ofrece. */
  tagData?: MasteryData
  /** Se llama al pulsar una palabra, con su agrupación para decidir adónde ir. */
  onSelect: (entry: MasteryEntry, group: MasteryGroup) => void
}
