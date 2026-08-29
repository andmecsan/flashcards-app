import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { CreateTopicForm, CardItem } from './types'
import type { Deck } from '../Dashboard/types'
import type { Category } from '../DeckDetail/types'

export const useCreateTopic = () => {
  const { deckId, categoryId } = useParams<{ deckId: string; categoryId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEditing = !!categoryId

  const { data: category } = useQuery<Category>({
    queryKey: ['category', categoryId],
    queryFn: () => api.get(`/categories/${categoryId}`).then(res => res.data),
    enabled: isEditing,
  })

  const { data: existingCards } = useQuery<CardItem[]>({
    queryKey: ['cards', categoryId],
    queryFn: () => api.get(`/categories/${categoryId}/cards`).then(res => res.data),
    enabled: isEditing,
  })

  const resolvedDeckId = deckId || category?.deck_id?.toString()

  const { data: deck } = useQuery<Deck>({
    queryKey: ['deck', resolvedDeckId],
    queryFn: () => api.get(`/decks/${resolvedDeckId}`).then(res => res.data),
    enabled: !!resolvedDeckId,
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
    if (isEditing && category && existingCards) {
      form.reset({
        name: category.name,
        cards: existingCards.length > 0
          ? existingCards.map(c => ({ front: c.front, back: c.back }))
          : [{ front: '', back: '' }],
      })
    }
  }, [isEditing, category, existingCards, form])

  const createMutation = useMutation({
    mutationFn: (data: CreateTopicForm) =>
      api.post(`/decks/${resolvedDeckId}/create_topic`, {
        name: data.name,
        cards: data.cards.filter(c => c.front.trim() && c.back.trim()),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', resolvedDeckId] })
      navigate(`/decks/${resolvedDeckId}`)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: CreateTopicForm) =>
      api.patch(`/categories/${categoryId}/update_topic`, {
        name: data.name,
        cards: data.cards.filter(c => c.front.trim() && c.back.trim()),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', resolvedDeckId] })
      queryClient.invalidateQueries({ queryKey: ['category', categoryId] })
      queryClient.invalidateQueries({ queryKey: ['cards', categoryId] })
      navigate(`/decks/${resolvedDeckId}`)
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    const validCards = data.cards.filter(c => c.front.trim() || c.back.trim())
    const invalidCards = validCards.some(c => !c.front.trim() || !c.back.trim())

    if (invalidCards) {
      form.setError('cards', { message: 'Todas las tarjetas deben tener pregunta y respuesta' })
      return
    }

    if (validCards.length === 0) {
      form.setError('cards', { message: 'Añade al menos una tarjeta' })
      return
    }

    if (isEditing) {
      updateMutation.mutate({ ...data, cards: validCards })
    } else {
      createMutation.mutate({ ...data, cards: validCards })
    }
  })

  const handleAddCard = () => {
    append({ front: '', back: '' })
  }

  const handleRemoveCard = (index: number) => {
    if (fields.length > 1) remove(index)
  }

  const handleBack = () => {
    navigate(`/decks/${resolvedDeckId}`)
  }

  return {
    deck,
    form,
    fields,
    isEditing,
    handleSubmit,
    handleAddCard,
    handleRemoveCard,
    handleBack,
  }
}