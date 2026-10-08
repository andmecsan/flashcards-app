import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type { Category } from './types'
import type { Deck } from '../Dashboard/types'
import type { DeckStatsData } from '../../components/DeckStats/types'
import { useDebounce } from '../../hooks/useDebounce'
import toast from 'react-hot-toast'
import type { Difficulty } from '../../utils/difficulty'

interface CategoriesResponse {
  categories: Category[]
  meta: { page: number; per_page: number; total: number; total_pages: number }
}

export const useDeckDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('')
  const [moveCategory, setMoveCategory] = useState<Category | null>(null)
  // Se puede llegar con `?tag_id=` (desde la nube de etiquetas) y el filtro ya puesto.
  const [searchParams] = useSearchParams()
  const [tagId, setTagId] = useState(searchParams.get('tag_id') ?? '')

  const debouncedSearch = useDebounce(search)

  const { data: deck } = useQuery<Deck>({
    queryKey: ['deck', id],
    queryFn: () => api.get(`/decks/${id}`).then(res => res.data),
  })

  const { data, isLoading } = useQuery<CategoriesResponse>({
    queryKey: ['categories', id, debouncedSearch, page, difficulty, tagId],
    queryFn: () => api.get(`/decks/${id}/categories`, {
      params: {
        ...(debouncedSearch ? { q: debouncedSearch } : {}),
        ...(difficulty ? { difficulty } : {}),
        ...(tagId ? { tag_id: tagId } : {}),
        page,
        per_page: 8
      },
    }).then(res => res.data),
  })

  const categories = data?.categories || []
  const totalPages = data?.meta?.total_pages || 1

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
      toast.success('Temario eliminado')
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

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleDifficultyChange = (value: Difficulty | '') => {
    setDifficulty(value)
    setPage(1)
  }

  const handleTagChange = (value: string) => {
    setTagId(value)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return {
    deck,
    categories,
    stats,
    difficulty,
    setDifficulty: handleDifficultyChange,
    tagId,
    setTagId: handleTagChange,
    search,
    setSearch: handleSearch,
    page,
    totalPages,
    loading: isLoading,
    deleteId, setDeleteId,
    moveCategory, setMoveCategory,
    handleDelete,
    confirmDelete,
    handleCategoryClick,
    handleBack,
    handlePageChange,
  }
}