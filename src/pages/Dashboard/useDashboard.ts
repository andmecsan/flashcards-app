import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { Deck, DecksResponse } from './types'
import type { StatsData } from '../../components/StatsBar/types'
import { useDebounce } from '../../hooks/useDebounce'
import toast from 'react-hot-toast'



export const useDashboard = () => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editDeck, setEditDeck] = useState<Deck | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [highlightedId, setHighlightedId] = useState<number | null>(null)

  const debouncedSearch = useDebounce(search)

  const { data, isLoading, isFetching } = useQuery<DecksResponse>({
    queryKey: ['decks', debouncedSearch, page],
    queryFn: () => api.get('/decks', {
      params: {
        ...(debouncedSearch ? { q: debouncedSearch } : {}),
        page,
        per_page: 8,
      },
    }).then(res => res.data),
  })

  const decks = data?.decks || []
  const totalPages = data?.meta?.total_pages || 1

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
    toast.success('Mazo eliminado')
  },
  })

  const handleDelete = (id: number) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) deleteMutation.mutate(deleteId)
  }

  const handleCreated = (id: number) => {
    setHighlightedId(id)
    setTimeout(() => setHighlightedId(null), 3000)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  return {
    decks,
    stats,
    search,
    setSearch: handleSearch,
    page,
    totalPages,
    loading: isLoading,
    fetching: isFetching,
    showModal, setShowModal,
    editDeck, setEditDeck,
    deleteId, setDeleteId,
    handleDelete,
    confirmDelete,
    highlightedId,
    handleCreated,
    handlePageChange,
  }
}