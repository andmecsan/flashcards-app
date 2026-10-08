import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { Card } from './index'

describe('Card — favorita', () => {
  it('no muestra la estrella si no se pasa onToggleFavorite', () => {
    renderWithTheme(<Card title="Chino" onDelete={vi.fn()} />)

    expect(screen.queryByRole('button', { name: /favorita/i })).not.toBeInTheDocument()
  })

  it('ofrece marcar como favorita cuando no lo es', () => {
    renderWithTheme(<Card title="Chino" onToggleFavorite={vi.fn()} />)

    const star = screen.getByRole('button', { name: 'Marcar como favorita' })
    expect(star).toHaveAttribute('aria-pressed', 'false')
  })

  it('ofrece quitar de favoritas cuando ya lo es', () => {
    renderWithTheme(<Card title="Chino" isFavorite onToggleFavorite={vi.fn()} />)

    const star = screen.getByRole('button', { name: 'Quitar de favoritas' })
    expect(star).toHaveAttribute('aria-pressed', 'true')
  })

  it('al pulsar la estrella llama a onToggleFavorite sin abrir la tarjeta', () => {
    const onToggle = vi.fn()
    const onClick = vi.fn()
    renderWithTheme(<Card title="Chino" onClick={onClick} onToggleFavorite={onToggle} />)

    fireEvent.click(screen.getByRole('button', { name: 'Marcar como favorita' }))

    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Card — mover', () => {
  it('no muestra «Mover» sin onMove', () => {
    renderWithTheme(<Card title="Números" onDelete={vi.fn()} />)

    expect(screen.queryByRole('button', { name: 'Mover a otra asignatura' })).not.toBeInTheDocument()
  })

  it('al pulsar «Mover» avisa sin abrir la tarjeta', () => {
    const onMove = vi.fn()
    const onClick = vi.fn()
    renderWithTheme(<Card title="Números" onClick={onClick} onMove={onMove} />)

    fireEvent.click(screen.getByRole('button', { name: 'Mover a otra asignatura' }))

    expect(onMove).toHaveBeenCalledTimes(1)
    expect(onClick).not.toHaveBeenCalled()
  })
})
