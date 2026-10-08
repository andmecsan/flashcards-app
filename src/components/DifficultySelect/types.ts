import type { Difficulty } from '../../utils/difficulty'

export interface DifficultySelectProps {
  label?: string
  /** Texto de la opción vacía; por defecto «Sin definir». */
  emptyLabel?: string
  /** Nombre accesible cuando no hay `label` visible. */
  ariaLabel?: string
  value?: Difficulty | ''
  /** Nº de temarios por dificultad: se muestra en cada opción y se desactivan las vacías. */
  counts?: Partial<Record<Difficulty, number>>
  onChange?: (value: Difficulty | '') => void
}
