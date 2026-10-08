import { describe, it, expect } from 'vitest'
import { cardsLabel } from './plural'

describe('cardsLabel', () => {
  it('usa el singular solo con una tarjeta', () => {
    expect(cardsLabel(1)).toBe('1 tarjeta')
    expect(cardsLabel(0)).toBe('0 tarjetas')
    expect(cardsLabel(12)).toBe('12 tarjetas')
  })
})
