import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { CreateDeckForm } from './types'

export const useCreateDeck = (onClose: () => void) => {
  const queryClient = useQueryClient()

  const form = useForm<CreateDeckForm>({
    defaultValues: { name: '', description: '' },
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateDeckForm) => api.post('/decks', { deck: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      form.reset()
      onClose()
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    createMutation.mutate(data)
  })

  return { form, handleSubmit }
}