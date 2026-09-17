import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { api } from '../../services/api'
import type { DeckFormData } from './types'
import toast from 'react-hot-toast'

export const useCreateDeck = (onClose: () => void, onCreated?: (id: number) => void, deck?: { id: number; name: string; icon: string; color: string }) => {
  const queryClient = useQueryClient()
  const isEditing = !!deck
  const [serverError, setServerError] = useState('')

  const form = useForm<DeckFormData>({
    defaultValues: {
      name: deck?.name || '',
      icon: deck?.icon || '📚',
      color: deck?.color || '#7C3AED',
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: DeckFormData) => api.post('/decks', { deck: data }),
   onSuccess: (res) => {
    queryClient.invalidateQueries({ queryKey: ['decks'] })
    queryClient.invalidateQueries({ queryKey: ['stats'] })
    form.reset()
    onCreated?.(res.data.id)
    toast.success('Mazo creado correctamente')
    onClose()
  },
  onError: (error: AxiosError<{ errors: string[] }>) => {
    const message = error.response?.data?.errors?.[0] || 'Error al crear el mazo'
    setServerError(message)
    toast.error(message)
  },
  })

  const updateMutation = useMutation({
    mutationFn: (data: DeckFormData) => api.patch(`/decks/${deck?.id}`, { deck: data }),
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['decks'] })
    queryClient.invalidateQueries({ queryKey: ['stats'] })
    form.reset()
    onCreated?.(deck!.id)
    toast.success('Mazo actualizado correctamente')
    onClose()
  },
  onError: (error: AxiosError<{ errors: string[] }>) => {
    const message = error.response?.data?.errors?.[0] || 'Error al guardar los cambios'
    setServerError(message)
    toast.error(message)
  },
  })

  const handleSubmit = form.handleSubmit((data) => {
    setServerError('')
    if (isEditing) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  })

  return { form, handleSubmit, isEditing, serverError }
}