import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { StudySessionCard } from '../../components/StudySession/types'

export const useStudy = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

const { data: cards = [], isLoading } = useQuery<StudySessionCard[]>({
  queryKey: ['study', 'deck', deckId],
  queryFn: () => api.get(`/decks/${deckId}/study`).then(res => res.data),
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  enabled: !!deckId,
})

  const reviewMutation = useMutation({
    mutationFn: ({ cardId, quality }: { cardId: number; quality: number }) =>
      api.post(`/cards/${cardId}/review`, { quality }),
  })

  const handleRate = (cardId: number, quality: number) => {
    reviewMutation.mutate({ cardId, quality })
  }

const handleExit = () => {
  queryClient.removeQueries({ queryKey: ['study', 'deck', deckId] })
  queryClient.invalidateQueries({ queryKey: ['decks'] })
  queryClient.invalidateQueries({ queryKey: ['deck-stats', deckId] })
  queryClient.invalidateQueries({ queryKey: ['stats'] })
  navigate(`/decks/${deckId}`)
}

  return { cards, loading: isLoading, handleRate, handleExit }
}