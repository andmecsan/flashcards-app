import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { api } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'
import { getValidTopicCards } from '../../utils/topicCards'
import type { CreateTopicForm } from '../../components/TopicForm/types'
import type { Deck } from '../Dashboard/types'
import toast from 'react-hot-toast'

export const useCreateTopic = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [generating, setGenerating] = useState(false)
  const [serverError, setServerError] = useState('')

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

  const createMutation = useMutation({
    mutationFn: (data: CreateTopicForm) =>
      api.post(`/decks/${deckId}/create_topic`, {
        name: data.name,
        cards: data.cards.filter(c => c.front.trim() && c.back.trim()),
      }),
      onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories', deckId] })
    toast.success('Tema creado correctamente')
    navigate(`/decks/${deckId}`)
  },
  onError: (error: unknown) => {
    const message = getApiErrorMessage(error, 'Error al crear el tema')
    setServerError(message)
    toast.error(message)
  }
    })

  const handleGenerateFromPdf = async (file: File) => {
    setGenerating(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await api.post('/cards/generate', formData, {
        headers: { 'Content-Type': undefined },
      })

      const { name, cards } = res.data

      if (name && !form.getValues('name')) {
        form.setValue('name', name)
      }

      const currentCards = form.getValues('cards')
      const hasEmptyOnly = currentCards.length === 1 && !currentCards[0].front && !currentCards[0].back

      if (hasEmptyOnly) {
        form.setValue('cards', cards.map((c: { front: string; back: string }) => ({
          front: c.front,
          back: c.back,
        })))
      } else {
        cards.forEach((c: { front: string; back: string }) => {
          append({ front: c.front, back: c.back })
        })
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Error al generar tarjetas desde el PDF'))
    } finally {
      setGenerating(false)
    }
  }

  const handleSubmit = form.handleSubmit((data) => {
    setServerError('')
    const validCards = getValidTopicCards(form, data.cards)
    if (!validCards) return

    createMutation.mutate({ ...data, cards: validCards })
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
    generating,
    serverError,
    handleSubmit,
    handleAddCard,
    handleRemoveCard,
    handleGenerateFromPdf,
    handleBack,
  }
}