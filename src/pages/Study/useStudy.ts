import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { StudyCard } from './types'

export const useStudy = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [studyCards, setStudyCards] = useState<StudyCard[] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completed, setCompleted] = useState(false)

  const { isLoading } = useQuery<StudyCard[]>({
    queryKey: ['study', 'deck', deckId],
    queryFn: async () => {
      const res = await api.get(`/decks/${deckId}/study`)
      if (!studyCards) {
        setStudyCards(res.data)
      }
      return res.data
    },
    enabled: !studyCards,
  })

  const cards = studyCards || []

  const reviewMutation = useMutation({
    mutationFn: ({ cardId, quality }: { cardId: number; quality: number }) =>
      api.post(`/cards/${cardId}/review`, { quality }),
  })

  const currentCard = cards[currentIndex]
  const total = cards.length
  const progress = currentIndex + 1

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleRate = (quality: number) => {
    if (!currentCard) return

    reviewMutation.mutate({ cardId: currentCard.id, quality })

    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
    } else {
      setCompleted(true)
    }
  }

  const handleExit = () => {
    queryClient.invalidateQueries({ queryKey: ['study'] })
    navigate(`/decks/${deckId}`)
  }

  return {
    currentCard,
    isFlipped,
    completed,
    loading: isLoading,
    progress,
    total,
    handleFlip,
    handleRate,
    handleExit,
  }
}