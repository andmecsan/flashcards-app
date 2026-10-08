export type Difficulty = 'easy' | 'medium' | 'hard'

export const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Media' },
  { value: 'hard', label: 'Difícil' },
]

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Fácil',
  medium: 'Media',
  hard: 'Difícil',
}

export const isDifficulty = (value: unknown): value is Difficulty =>
  DIFFICULTY_OPTIONS.some((option) => option.value === value)

/**
 * Construye los parámetros de Estudiar y Repasar (`?difficulty=…&tag_id=…`);
 * vacío si no hay ningún filtro.
 */
export const studyFiltersQuery = (difficulty: Difficulty | '', tagId: string): string => {
  const params = new URLSearchParams()
  if (difficulty) params.set('difficulty', difficulty)
  if (tagId) params.set('tag_id', tagId)
  const query = params.toString()
  return query ? `?${query}` : ''
}

/** Construye `?difficulty=...` para las rutas de Estudiar y Repasar (vacío si no hay filtro). */
export const difficultyQuery = (difficulty: Difficulty | ''): string =>
  difficulty ? `?difficulty=${difficulty}` : ''
