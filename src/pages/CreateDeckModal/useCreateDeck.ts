import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { DeckFormData } from './types'

export const useCreateDeck = (onClose: () => void, deck?: { id: number; name: string; icon: string; color: string }) => {
  const queryClient = useQueryClient()
  const isEditing = !!deck

  const form = useForm<DeckFormData>({
    defaultValues: {
      name: deck?.name || '',
      icon: deck?.icon || '📚',
      color: deck?.color || '#7C3AED',
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: DeckFormData) => api.post('/decks', { deck: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      form.reset()
      onClose()
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: DeckFormData) => api.patch(`/decks/${deck?.id}`, { deck: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      form.reset()
      onClose()
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    if (isEditing) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  })

  return { form, handleSubmit, isEditing }
}