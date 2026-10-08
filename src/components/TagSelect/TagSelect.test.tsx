import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { chooseOption, openSelect, selectedText } from '../../test/select'
import { TagSelect } from './index'

const options = [
  { id: 1, name: 'Examen', count: 3 },
  { id: 2, name: 'Teoría', count: 1 },
]

describe('TagSelect', () => {
  it('lista las etiquetas con su recuento y la opción de todas', () => {
    renderWithTheme(<TagSelect options={options} value="" onChange={vi.fn()} />)

    openSelect('Filtrar por etiqueta')

    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual([
      'Todas las etiquetas',
      'Examen (3)',
      'Teoría (1)',
    ])
  })

  it('muestra la etiqueta elegida', () => {
    renderWithTheme(<TagSelect options={options} value="2" onChange={vi.fn()} />)

    expect(selectedText('Filtrar por etiqueta')).toBe('Teoría (1)')
  })

  it('devuelve el id elegido como texto', () => {
    const onChange = vi.fn()
    renderWithTheme(<TagSelect options={options} value="" onChange={onChange} />)

    chooseOption('Filtrar por etiqueta', 'Teoría (1)')

    expect(onChange).toHaveBeenCalledWith('2')
  })
})
