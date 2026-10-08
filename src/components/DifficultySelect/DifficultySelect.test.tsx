import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { chooseOption, openSelect, selectedText } from '../../test/select'
import { DifficultySelect } from './index'

const optionNames = () => screen.getAllByRole('option').map((o) => o.textContent)

describe('DifficultySelect', () => {
  it('ofrece la opción vacía y las tres dificultades', () => {
    renderWithTheme(<DifficultySelect ariaLabel="Dificultad" />)

    openSelect('Dificultad')

    expect(optionNames()).toEqual(['Sin definir', 'Fácil', 'Media', 'Difícil'])
  })

  it('permite cambiar el texto de la opción vacía', () => {
    renderWithTheme(<DifficultySelect ariaLabel="Filtro" emptyLabel="Todas las dificultades" />)

    expect(selectedText('Filtro')).toBe('Todas las dificultades')
  })

  it('muestra el valor recibido', () => {
    renderWithTheme(<DifficultySelect label="Dificultad" value="medium" onChange={vi.fn()} />)

    expect(selectedText('Dificultad')).toBe('Media')
  })

  it('devuelve la dificultad elegida y vacío al quitarla', () => {
    const onChange = vi.fn()
    renderWithTheme(<DifficultySelect label="Dificultad" value="" onChange={onChange} />)

    chooseOption('Dificultad', 'Difícil')
    expect(onChange).toHaveBeenLastCalledWith('hard')

    chooseOption('Dificultad', 'Sin definir')
    expect(onChange).toHaveBeenLastCalledWith('')
  })

  describe('con contadores', () => {
    const counts = { easy: 3, medium: 0, hard: 2 }

    it('muestra cuántas tarjetas hay en cada dificultad', () => {
      renderWithTheme(<DifficultySelect ariaLabel="Filtro" counts={counts} onChange={vi.fn()} />)

      openSelect('Filtro')

      expect(optionNames()).toEqual(['Sin definir', 'Fácil (3)', 'Media (0)', 'Difícil (2)'])
    })

    it('desactiva las dificultades sin tarjetas', () => {
      renderWithTheme(<DifficultySelect ariaLabel="Filtro" counts={counts} onChange={vi.fn()} />)

      openSelect('Filtro')

      expect(screen.getByRole('option', { name: 'Media (0)' })).toHaveAttribute('aria-disabled', 'true')
      expect(screen.getByRole('option', { name: 'Fácil (3)' })).not.toHaveAttribute('aria-disabled')
    })

    it('no desactiva la opción ya elegida aunque se quede en cero', () => {
      renderWithTheme(
        <DifficultySelect ariaLabel="Filtro" counts={counts} value="medium" onChange={vi.fn()} />,
      )

      openSelect('Filtro')

      expect(screen.getByRole('option', { name: 'Media (0)' })).not.toHaveAttribute('aria-disabled')
    })
  })
})
