import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

  const handleRate = () => {}

  const handleExit = () => {
    navigate(`/decks/${deckId}`)
  }

  return { cards, loading, handleRate, handleExit }
}