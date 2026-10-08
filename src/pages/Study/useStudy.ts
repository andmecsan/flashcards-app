import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { StudySessionCard } from '../../components/StudySession/types'
import { isDifficulty } from '../../utils/difficulty'

export const useStudy = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const difficultyParam = searchParams.get('difficulty')
  const difficulty = isDifficulty(difficultyParam) ? difficultyParam : null
  const tagId = searchParams.get('tag_id')

const { data: cards = [], isLoading } = useQuery<StudySessionCard[]>({
  queryKey: ['study', 'deck', deckId, difficulty, tagId],
  queryFn: () => api.get(`/decks/${deckId}/study`, {
    params: { ...(difficulty ? { difficulty } : {}), ...(tagId ? { tag_id: tagId } : {}) },
  }).then(res => res.data),
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

  return { cards, loading: isLoading, handleRate, handleExit, difficulty, tagId }
}