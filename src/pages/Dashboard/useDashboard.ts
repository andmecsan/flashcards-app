import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { Deck, DecksResponse } from './types'
import type { StatsData } from '../../components/StatsBar/types'
import type { MasteryData } from '../../components/MasteryClouds/types'
import { useDebounce } from '../../hooks/useDebounce'
import toast from 'react-hot-toast'



export const useDashboard = () => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editDeck, setEditDeck] = useState<Deck | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [highlightedId, setHighlightedId] = useState<number | null>(null)

  const debouncedSearch = useDebounce(search)

  const { data, isLoading, isFetching } = useQuery<DecksResponse>({
    queryKey: ['decks', debouncedSearch, page, onlyFavorites],
    queryFn: () => api.get('/decks', {
      params: {
        ...(debouncedSearch ? { q: debouncedSearch } : {}),
        ...(onlyFavorites ? { favorites: 1 } : {}),
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

  const { data: mastery } = useQuery<MasteryData>({
    queryKey: ['stats', 'mastery'],
    queryFn: () => api.get('/stats/mastery').then(res => res.data),
  })

  const { data: masteryTags } = useQuery<MasteryData>({
    queryKey: ['stats', 'mastery', 'tag'],
    queryFn: () => api.get('/stats/mastery', { params: { group: 'tag' } }).then(res => res.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/decks/${id}`),
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['decks'] })
    queryClient.invalidateQueries({ queryKey: ['stats'] })
    setDeleteId(null)
    toast.success('Asignatura eliminada')
  },
  })

  const favoriteMutation = useMutation({
    mutationFn: ({ id, favorite }: { id: number; favorite: boolean }) =>
      api.patch(`/decks/${id}/favorite`, { favorite }),
    onSuccess: (_data, { favorite }) => {
      queryClient.invalidateQueries({ queryKey: ['decks'] })
      toast.success(favorite ? 'Añadida a favoritas' : 'Quitada de favoritas')
    },
    onError: () => toast.error('No se pudo actualizar la asignatura'),
  })

  const handleToggleFavorite = (deck: Deck) =>
    favoriteMutation.mutate({ id: deck.id, favorite: !deck.favorite })

  const handleToggleOnlyFavorites = () => {
    setOnlyFavorites((current) => !current)
    setPage(1)
  }

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
    mastery,
    masteryTags,
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
    onlyFavorites,
    handleToggleOnlyFavorites,
    handleToggleFavorite,
  }
}