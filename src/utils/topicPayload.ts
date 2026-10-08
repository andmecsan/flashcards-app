import type { CreateTopicForm } from '../components/TopicForm/types'

/**
 * Cuerpo que se envía al crear o editar un temario. Al editar (`withIds`) se
 * incluye el `id` de las tarjetas ya guardadas, para que se actualicen en el sitio
 * y conserven su progreso. La dificultad vacía se envía como '' para quitarla.
 */
export const buildTopicPayload = (data: CreateTopicForm, { withIds }: { withIds: boolean }) => ({
  name: data.name,
  difficulty: data.difficulty ?? '',
  cards: data.cards
    .filter((c) => c.front.trim() && c.back.trim())
    .map((c) => ({
      ...(withIds && c.cardId !== undefined ? { id: c.cardId } : {}),
      front: c.front,
      back: c.back,
      tags: c.tags ?? [],
    })),
})
