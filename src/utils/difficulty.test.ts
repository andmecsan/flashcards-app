import { describe, it, expect } from 'vitest'
import { DIFFICULTY_OPTIONS, difficultyQuery, isDifficulty, studyFiltersQuery } from './difficulty'

describe('difficulty', () => {
  it('reconoce solo los tres valores válidos', () => {
    expect(isDifficulty('easy')).toBe(true)
    expect(isDifficulty('medium')).toBe(true)
    expect(isDifficulty('hard')).toBe(true)
    expect(isDifficulty('')).toBe(false)
    expect(isDifficulty('extrema')).toBe(false)
    expect(isDifficulty(null)).toBe(false)
  })

  it('ofrece las opciones en orden de fácil a difícil', () => {
    expect(DIFFICULTY_OPTIONS.map((o) => o.label)).toEqual(['Fácil', 'Media', 'Difícil'])
  })

  it('construye el parámetro de la URL, o nada si no hay filtro', () => {
    expect(difficultyQuery('hard')).toBe('?difficulty=hard')
    expect(difficultyQuery('')).toBe('')
  })

  it('combina dificultad y etiqueta en los parámetros de estudio', () => {
    expect(studyFiltersQuery('', '')).toBe('')
    expect(studyFiltersQuery('hard', '')).toBe('?difficulty=hard')
    expect(studyFiltersQuery('', '4')).toBe('?tag_id=4')
    expect(studyFiltersQuery('easy', '4')).toBe('?difficulty=easy&tag_id=4')
  })
})
