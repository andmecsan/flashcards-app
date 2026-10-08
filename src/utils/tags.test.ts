import { describe, it, expect } from 'vitest'
import { addTag, normalizeTag, MAX_TAGS_PER_CARD, MAX_TAG_LENGTH } from './tags'

describe('normalizeTag', () => {
  it('ignora mayúsculas, tildes y espacios repetidos', () => {
    expect(normalizeTag('  Exámen   FINAL ')).toBe('examen final')
  })

  it('no altera el chino', () => {
    expect(normalizeTag('爸爸')).toBe('爸爸')
  })
})

describe('addTag', () => {
  it('añade una etiqueta nueva sin espacios sobrantes', () => {
    expect(addTag([], '  Examen  ')).toEqual(['Examen'])
  })

  it('ignora las vacías', () => {
    expect(addTag(['A'], '   ')).toEqual(['A'])
  })

  it('no repite una etiqueta, aunque cambien mayúsculas o tildes', () => {
    expect(addTag(['Examen'], 'EXÁMEN')).toEqual(['Examen'])
  })

  it('respeta el máximo de etiquetas por tarjeta', () => {
    const full = Array.from({ length: MAX_TAGS_PER_CARD }, (_, i) => `t${i}`)

    expect(addTag(full, 'otra')).toEqual(full)
  })

  it('recorta al máximo de caracteres', () => {
    expect(addTag([], 'a'.repeat(50))[0]).toHaveLength(MAX_TAG_LENGTH)
  })
})
