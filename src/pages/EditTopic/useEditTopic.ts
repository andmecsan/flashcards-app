import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { api } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'
import { getValidTopicCards } from '../../utils/topicCards'
import { buildTopicPayload } from '../../utils/topicPayload'
import type { CreateTopicForm, CardItem } from '../../components/TopicForm/types'
import type { Deck } from '../Dashboard/types'
import type { Category } from '../DeckDetail/types'
import toast from 'react-hot-toast'

export const useEditTopic = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [serverError, setServerError] = useState('')

  const { data: category } = useQuery<Category>({
    queryKey: ['category', categoryId],
    queryFn: () => api.get(`/categories/${categoryId}`).then(res => res.data),
  })

  const { data: existingCards } = useQuery<CardItem[]>({
    queryKey: ['cards', categoryId],
    queryFn: () => api.get(`/categories/${categoryId}/cards`).then(res => res.data),
  })

  const deckId = category?.deck_id?.toString()

  const { data: deck } = useQuery<Deck>({
    queryKey: ['deck', deckId],
    queryFn: () => api.get(`/decks/${deckId}`).then(res => res.data),
    enabled: !!deckId,
  })

  const form = useForm<CreateTopicForm>({
    defaultValues: {
      name: '',
      cards: [{ front: '', back: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'cards',
  })

  useEffect(() => {
    if (category && existingCards) {
      form.reset({
        name: category.name,
        difficulty: category.difficulty ?? '',
        cards: existingCards.length > 0
          ? existingCards.map(c => ({ cardId: c.id, front: c.front, back: c.back, tags: c.tags ?? [] }))
          : [{ front: '', back: '' }],
      })
    }
  }, [category, existingCards, form])

  const updateMutation = useMutation({
    mutationFn: (data: CreateTopicForm) =>
      api.patch(`/categories/${categoryId}/update_topic`, buildTopicPayload(data, { withIds: true })),
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories', deckId] })
    queryClient.invalidateQueries({ queryKey: ['category', categoryId] })
    queryClient.invalidateQueries({ queryKey: ['cards', categoryId] })
    queryClient.invalidateQueries({ queryKey: ['tags'] })
    queryClient.invalidateQueries({ queryKey: ['deck-stats', deckId] })
    toast.success('Tema actualizado correctamente')
    navigate(`/decks/${deckId}`)
    },
    onError: (error: unknown) => {
    const message = getApiErrorMessage(error, 'Error al guardar los cambios')
    setServerError(message)
    toast.error(message)
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    setServerError('')
    const validCards = getValidTopicCards(form, data.cards)
    if (!validCards) return

    updateMutation.mutate({ ...data, cards: validCards })
  })

  const handleAddCard = () => append({ front: '', back: '' })

  const handleRemoveCard = (index: number) => {
    if (fields.length > 1) remove(index)
  }

  const handleBack = () => navigate(`/decks/${deckId}`)

  return {
    deck,
    form,
    fields,
    serverError,
    handleSubmit,
    handleAddCard,
    handleRemoveCard,
    handleBack,
  }
}