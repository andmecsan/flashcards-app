import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { Category } from './types'
import type { Deck } from '../Dashboard/types'
import type { DeckStatsData } from '../../components/DeckStats/types'
import { useDebounce } from '../../hooks/useDebounce'

export const useDeckDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const debouncedSearch = useDebounce(search)

  const { data: deck } = useQuery<Deck>({
    queryKey: ['deck', id],
    queryFn: () => api.get(`/decks/${id}`).then(res => res.data),
  })

const { data: categories = [], isLoading } = useQuery<Category[]>({
  queryKey: ['categories', id, debouncedSearch],
  queryFn: () => api.get(`/decks/${id}/categories`, {
    params: debouncedSearch ? { q: debouncedSearch } : undefined,
  }).then(res => res.data),
})

  const { data: stats } = useQuery<DeckStatsData>({
    queryKey: ['deck-stats', id],
    queryFn: () => api.get(`/decks/${id}/stats`).then(res => res.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (categoryId: number) => api.delete(`/categories/${categoryId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', id] })
      queryClient.invalidateQueries({ queryKey: ['deck-stats', id] })
      setDeleteId(null)
    },
  })

  const handleDelete = (categoryId: number) => {
    setDeleteId(categoryId)
  }

  const confirmDelete = () => {
    if (deleteId) deleteMutation.mutate(deleteId)
  }

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/decks/${deck?.id}/review/${categoryId}`)
  }

  const handleBack = () => {
    navigate('/')
  }

  return {
    deck,
    categories,
    stats,
    search, setSearch,
    loading: isLoading,
    deleteId, setDeleteId,
    handleDelete,
    confirmDelete,
    handleCategoryClick,
    handleBack
  }
}