import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { WordCloud } from './index'
import {
  fontSizeFor,
  tierFor,
  shortLabel,
  sortForCloud,
  MIN_FONT_REM,
  MAX_FONT_REM,
  TONE_COLORS,
} from './utils'

describe('utils de WordCloud', () => {
  it('asigna el tamaño máximo al mayor peso y el mínimo al menor', () => {
    expect(fontSizeFor(4, 1, 4)).toBe(MAX_FONT_REM)
    expect(fontSizeFor(1, 1, 4)).toBe(MIN_FONT_REM)
  })

  it('normaliza al rango propio: pesos parecidos siguen distinguiéndose', () => {
    expect(fontSizeFor(0.9, 0.6, 1)).toBeGreaterThan(fontSizeFor(0.7, 0.6, 1))
  })

  it('usa un tamaño intermedio si todos los pesos son iguales', () => {
    const size = fontSizeFor(3, 3, 3)
    expect(size).toBeGreaterThan(MIN_FONT_REM)
    expect(size).toBeLessThan(MAX_FONT_REM)
  })

  it('reparte el nivel de color en tres tramos', () => {
    expect(tierFor(10, 0, 10)).toBe(0)
    expect(tierFor(5, 0, 10)).toBe(1)
    expect(tierFor(1, 0, 10)).toBe(2)
    expect(tierFor(7, 7, 7)).toBe(0)
  })

  it('recorta los textos largos y respeta los cortos', () => {
    expect(shortLabel('Hola')).toBe('Hola')
    const largo = 'a'.repeat(60)
    expect(shortLabel(largo).length).toBe(40)
    expect(shortLabel(largo).endsWith('…')).toBe(true)
  })

  it('ordena alfabéticamente sin modificar el original', () => {
    const items = [
      { id: 1, label: 'Zeta', weight: 5 },
      { id: 2, label: 'Álamo', weight: 1 },
    ]
    expect(sortForCloud(items).map((i) => i.label)).toEqual(['Álamo', 'Zeta'])
    expect(items[0].label).toBe('Zeta')
  })

  it('tiene paletas distintas para reforzar y puntos fuertes', () => {
    expect(TONE_COLORS.weak[0]).not.toBe(TONE_COLORS.strong[0])
  })
})

describe('WordCloud', () => {
  const items = [
    { id: 1, label: 'Difícil', weight: 4, hint: 'Detalle de Difícil' },
    { id: 2, label: 'Fácil', weight: 1 },
  ]

  it('muestra cada elemento con su etiqueta', () => {
    renderWithTheme(<WordCloud items={items} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Difícil')).toBeInTheDocument()
    expect(screen.getByText('Fácil')).toBeInTheDocument()
  })

  it('pone una letra mayor en el de más peso', () => {
    renderWithTheme(<WordCloud items={items} />)

    const size = (name: string) => parseFloat(getComputedStyle(screen.getByText(name)).fontSize)
    expect(size('Difícil')).toBeGreaterThan(size('Fácil'))
  })

  it('usa el hint como texto al pasar el ratón, o la etiqueta si no hay', () => {
    renderWithTheme(<WordCloud items={items} />)

    expect(screen.getByText('Difícil')).toHaveAttribute('title', 'Detalle de Difícil')
    expect(screen.getByText('Fácil')).toHaveAttribute('title', 'Fácil')
  })

  it('no hace clicables las palabras sin onSelect', () => {
    renderWithTheme(<WordCloud items={items} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('con onSelect, cada palabra es un botón que devuelve su elemento', () => {
    const onSelect = vi.fn()
    renderWithTheme(<WordCloud items={items} onSelect={onSelect} />)

    fireEvent.click(screen.getByRole('button', { name: 'Fácil' }))

    expect(onSelect).toHaveBeenCalledWith(items[1])
  })

  it('usa un color diferente según la paleta', () => {
    const { unmount } = renderWithTheme(<WordCloud items={items} tone="weak" />)
    const weakColor = getComputedStyle(screen.getByText('Difícil')).color
    unmount()
    renderWithTheme(<WordCloud items={items} tone="strong" />)

    expect(getComputedStyle(screen.getByText('Difícil')).color).not.toBe(weakColor)
  })
})
