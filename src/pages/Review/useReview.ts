import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import type { StudySessionCard } from '../../components/StudySession/types'
import { useQueryClient } from '@tanstack/react-query'

export const useReview = () => {
  const queryClient = useQueryClient()
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

  const handleRate = () => {}

const handleExit = () => {
  queryClient.invalidateQueries({ queryKey: ['decks'] })
  queryClient.invalidateQueries({ queryKey: ['deck-stats', deckId] })
  queryClient.invalidateQueries({ queryKey: ['stats'] })
  navigate(`/decks/${deckId}`)
}

  return { cards, loading, handleRate, handleExit }
}