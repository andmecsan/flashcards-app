import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { CreateTopicForm, CardItem } from '../CreateTopic/types'
import type { Deck } from '../Dashboard/types'
import type { Category } from '../DeckDetail/types'
import type { AxiosError } from 'axios'
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
        cards: existingCards.length > 0
          ? existingCards.map(c => ({ front: c.front, back: c.back }))
          : [{ front: '', back: '' }],
      })
    }
  }, [category, existingCards, form])

  const updateMutation = useMutation({
    mutationFn: (data: CreateTopicForm) =>
      api.patch(`/categories/${categoryId}/update_topic`, {
        name: data.name,
        cards: data.cards.filter(c => c.front.trim() && c.back.trim()),
      }),
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories', deckId] })
    queryClient.invalidateQueries({ queryKey: ['category', categoryId] })
    queryClient.invalidateQueries({ queryKey: ['cards', categoryId] })
    toast.success('Tema actualizado correctamente')
    navigate(`/decks/${deckId}`)
    },
    onError: (error: AxiosError<{ errors: string[] }>) => {
    const message = error.response?.data?.errors?.[0] || 'Error al guardar los cambios'
    setServerError(message)
    toast.error(message)
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    setServerError('')
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