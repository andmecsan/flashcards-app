import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { Deck } from './types'
import type { StatsData } from '../../components/StatsBar/types'
import { useDebounce } from '../../hooks/useDebounce'

export const useDashboard = () => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const debouncedSearch = useDebounce(search)

  const { data: decks = [], isLoading, isFetching } = useQuery<Deck[]>({
    queryKey: ['decks', debouncedSearch],
    queryFn: () => api.get('/decks', {
      params: debouncedSearch ? { q: debouncedSearch } : undefined,
    }).then(res => res.data),
  })

  const { data: stats } = useQuery<StatsData>({
    queryKey: ['stats'],
    queryFn: () => api.get('/stats').then(res => res.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/decks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      setDeleteId(null)
    },
  })

  const handleDelete = (id: number) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) deleteMutation.mutate(deleteId)
  }

  return {
    decks,
    stats,
    search, setSearch,
    loading: isLoading,
    showModal, setShowModal,
    deleteId, setDeleteId,
    handleDelete,
    confirmDelete,
    fetching: isFetching
  }
}