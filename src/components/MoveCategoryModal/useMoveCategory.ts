import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { api } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'
import type { Deck, DecksResponse } from '../../pages/Dashboard/types'

export const useMoveCategory = (categoryId: number, currentDeckId: number, onDone: () => void) => {
  const queryClient = useQueryClient()
  const [targetId, setTargetId] = useState('')
  const [serverError, setServerError] = useState('')

  // El API pagina; 100 es el máximo por página y sobra para elegir destino.
  const { data, isLoading } = useQuery<DecksResponse>({
    queryKey: ['decks', 'move-targets'],
    queryFn: () => api.get('/decks', { params: { per_page: 100 } }).then((res) => res.data),
  })

  const targets: Deck[] = (data?.decks ?? []).filter((deck) => deck.id !== currentDeckId)

  const mutation = useMutation({
    mutationFn: (deckId: number) => api.patch(`/categories/${categoryId}/move`, { deck_id: deckId }),
    onSuccess: (_res, deckId) => {
      const target = targets.find((deck) => deck.id === deckId)
      ;['categories', 'decks', 'deck-stats', 'deck', 'stats'].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      )
      toast.success(target ? `Temario movido a «${target.name}»` : 'Temario movido')
      onDone()
    },
    onError: (error: unknown) => setServerError(getApiErrorMessage(error, 'No se pudo mover el temario')),
  })

  const handleChange = (value: string) => {
    setTargetId(value)
    setServerError('')
  }

  const handleSubmit = () => {
    if (targetId) mutation.mutate(Number(targetId))
  }

  return {
    targets,
    loading: isLoading,
    targetId,
    handleChange,
    handleSubmit,
    saving: mutation.isPending,
    serverError,
  }
}
