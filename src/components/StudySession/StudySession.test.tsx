import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../test/renderWithTheme'
import { StudySession } from './index'
import type { StudySessionCard } from './types'

const cards: StudySessionCard[] = [
  { id: 1, front: 'Pregunta 1', back: 'Respuesta 1', category: 'Tema' },
  { id: 2, front: 'Pregunta 2', back: 'Respuesta 2', category: 'Tema' },
]

const advance = (ms: number) => act(() => { vi.advanceTimersByTime(ms) })

describe('StudySession', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('muestra el estado vacío y llama a onExit al pulsar Volver', () => {
    const onExit = vi.fn()

    renderWithTheme(
      <StudySession cards={[]} loading={false} onRate={vi.fn()} onExit={onExit} />,
    )

    expect(screen.getByText('No hay tarjetas pendientes')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Volver'))
    expect(onExit).toHaveBeenCalled()
  })

  it('muestra el loader mientras loading es true', () => {
    renderWithTheme(
      <StudySession cards={cards} loading onRate={vi.fn()} onExit={vi.fn()} />,
    )

    expect(screen.getByText('Cargando tarjetas...')).toBeInTheDocument()
  })

  it('en modo Estudiar, calificar una tarjeta llama a onRate y avanza a la siguiente', () => {
    const onRate = vi.fn()

    renderWithTheme(
      <StudySession cards={cards} loading={false} showRatings onRate={onRate} onExit={vi.fn()} />,
    )

    expect(screen.getByText('Pregunta 1')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Lo sabía'))
    expect(onRate).toHaveBeenCalledWith(1, 5)

    advance(600)

    expect(screen.getByText('Pregunta 2')).toBeInTheDocument()
  })

  it('en modo Repasar, Saltar avanza sin llamar a onRate', () => {
    const onRate = vi.fn()

    renderWithTheme(
      <StudySession
        cards={cards}
        loading={false}
        showRatings={false}
        onRate={onRate}
        onExit={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByText('Saltar'))
    expect(onRate).not.toHaveBeenCalled()

    advance(600)

    expect(screen.getByText('Pregunta 2')).toBeInTheDocument()
  })

  it('muestra la pantalla de sesión completada tras la última tarjeta', () => {
    renderWithTheme(
      <StudySession cards={cards} loading={false} showRatings onRate={vi.fn()} onExit={vi.fn()} />,
    )

    fireEvent.click(screen.getByText('Lo sabía'))
    advance(600)

    fireEvent.click(screen.getByText('Lo sabía'))
    advance(600)

    expect(screen.getByText('¡Sesión completada!')).toBeInTheDocument()
  })
})
