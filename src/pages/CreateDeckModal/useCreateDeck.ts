import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'
import type { CreateDeckModalProps, DeckFormData } from './types'
import toast from 'react-hot-toast'

/** Cuerpo del API: el área, nivel y curso vacíos se envían como '' para quitarlos. */
export const toPayload = ({ areaId, levelId, courseId, ...rest }: DeckFormData) => ({
  ...rest,
  area_id: areaId,
  level_id: levelId,
  course_id: courseId,
})

export const useCreateDeck = (onClose: () => void, onCreated?: (id: number) => void, deck?: CreateDeckModalProps['deck']) => {
  const queryClient = useQueryClient()
  const isEditing = !!deck
  const [serverError, setServerError] = useState('')

  const form = useForm<DeckFormData>({
    defaultValues: {
      name: deck?.name || '',
      icon: deck?.icon || '📚',
      color: deck?.color || '#7C3AED',
      areaId: deck?.area ? String(deck.area.id) : '',
      levelId: deck?.level ? String(deck.level.id) : '',
      courseId: deck?.course ? String(deck.course.id) : '',
    },
  })

  const createMutation = useMutation({
    mutationFn: (data: DeckFormData) => api.post('/decks', { deck: toPayload(data) }),
   onSuccess: (res) => {
    queryClient.invalidateQueries({ queryKey: ['decks'] })
    queryClient.invalidateQueries({ queryKey: ['stats'] })
    form.reset()
    onCreated?.(res.data.id)
    toast.success('Asignatura creada correctamente')
    onClose()
  },
  onError: (error: unknown) => {
    const message = getApiErrorMessage(error, 'Error al crear la asignatura')
    setServerError(message)
    toast.error(message)
  },
  })

  const updateMutation = useMutation({
    mutationFn: (data: DeckFormData) => api.patch(`/decks/${deck?.id}`, { deck: toPayload(data) }),
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['decks'] })
    queryClient.invalidateQueries({ queryKey: ['stats'] })
    form.reset()
    onCreated?.(deck!.id)
    toast.success('Asignatura actualizada correctamente')
    onClose()
  },
  onError: (error: unknown) => {
    const message = getApiErrorMessage(error, 'Error al guardar los cambios')
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