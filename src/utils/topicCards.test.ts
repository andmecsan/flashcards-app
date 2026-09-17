import { describe, it, expect, vi } from 'vitest'
import type { UseFormReturn } from 'react-hook-form'
import { getValidTopicCards } from './topicCards'
import type { CreateTopicForm } from '../components/TopicForm/types'

const fakeForm = () =>
  ({ setError: vi.fn() }) as unknown as UseFormReturn<CreateTopicForm>

describe('getValidTopicCards', () => {
  it('devuelve solo las tarjetas con contenido, descartando las vacías', () => {
    const form = fakeForm()
    const cards = [
      { front: 'Pregunta', back: 'Respuesta' },
      { front: '', back: '' },
    ]

    const result = getValidTopicCards(form, cards)

    expect(result).toEqual([{ front: 'Pregunta', back: 'Respuesta' }])
    expect(form.setError).not.toHaveBeenCalled()
  })

  it('rechaza y marca error si una tarjeta tiene solo pregunta o solo respuesta', () => {
    const form = fakeForm()
    const cards = [{ front: 'Pregunta sin respuesta', back: '' }]

    const result = getValidTopicCards(form, cards)

    expect(result).toBeNull()
    expect(form.setError).toHaveBeenCalledWith('cards', {
      message: 'Todas las tarjetas deben tener pregunta y respuesta',
    })
  })

  it('rechaza y marca error si no queda ninguna tarjeta con contenido', () => {
    const form = fakeForm()
    const cards = [{ front: '', back: '' }]

    const result = getValidTopicCards(form, cards)

    expect(result).toBeNull()
    expect(form.setError).toHaveBeenCalledWith('cards', {
      message: 'Añade al menos una tarjeta',
    })
  })
})
