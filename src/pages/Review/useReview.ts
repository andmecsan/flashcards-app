import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { StudySessionCard } from '../../components/StudySession/types'

export const useReview = () => {
  const { deckId, categoryId } = useParams<{ deckId: string; categoryId: string }>()
  const navigate = useNavigate()

  const [cards, setCards] = useState<StudySessionCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/categories/${categoryId}/review_cards`)
      .then(res => setCards(res.data))
      .catch(err => console.error('Error cargando tarjetas:', err))
      .finally(() => setLoading(false))
  }, [categoryId])

  const reviewMutation = useMutation({
    mutationFn: ({ cardId, quality }: { cardId: number; quality: number }) =>
      api.post(`/cards/${cardId}/review`, { quality }),
  })

  const handleRate = (cardId: number, quality: number) => {
    reviewMutation.mutate({ cardId, quality })
  }

  const handleExit = () => {
    navigate(`/decks/${deckId}`)
  }

  return { cards, loading, handleRate, handleExit }
}