import { describe, it, expect } from 'vitest'
import { buildTopicPayload } from './topicPayload'
import type { CreateTopicForm } from '../components/TopicForm/types'

const form: CreateTopicForm = {
  name: 'Genética',
  difficulty: 'hard',
  cards: [
    { cardId: 7, front: 'ADN', back: 'Ácido', tags: ['Examen'] },
    { front: 'ARN', back: 'Otro' },
    { front: '', back: '' },
  ],
}

describe('buildTopicPayload', () => {
  it('envía el nombre y la dificultad del temario, y ya no el área, nivel o curso', () => {
    const payload = buildTopicPayload(form, { withIds: false })

    expect(payload).toMatchObject({ name: 'Genética', difficulty: 'hard' })
    expect(payload).not.toHaveProperty('area_id')
  })

  it('envía la dificultad vacía para quitarla', () => {
    expect(buildTopicPayload({ ...form, difficulty: undefined }, { withIds: false }).difficulty).toBe('')
  })

  it('descarta las tarjetas vacías y rellena las etiquetas por defecto', () => {
    const { cards } = buildTopicPayload(form, { withIds: false })

    expect(cards).toEqual([
      { front: 'ADN', back: 'Ácido', tags: ['Examen'] },
      { front: 'ARN', back: 'Otro', tags: [] },
    ])
  })

  it('al editar incluye el id de las tarjetas ya guardadas, y solo de esas', () => {
    const { cards } = buildTopicPayload(form, { withIds: true })

    expect(cards[0]).toMatchObject({ id: 7 })
    expect(cards[1]).not.toHaveProperty('id')
  })
})
