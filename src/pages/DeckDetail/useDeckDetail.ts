import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type{ Category } from './types'
import type { Deck } from '../Dashboard/types'

export const useDeckDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const { data: deck } = useQuery<Deck>({
    queryKey: ['deck', id],
    queryFn: () => api.get(`/decks/${id}`).then(res => res.data),
  })

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['categories', id],
    queryFn: () => api.get(`/decks/${id}/categories`).then(res => res.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (categoryId: number) => api.delete(`/categories/${categoryId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories', id] }),
  })

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (categoryId: number) => {
    if (!window.confirm('¿Eliminar esta categoría y todas sus tarjetas?')) return
    deleteMutation.mutate(categoryId)
  }

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  const handleBack = () => {
    navigate('/')
  }

  return {
    deck,
    categories: filteredCategories,
    search, setSearch,
    loading: isLoading,
    showModal, setShowModal,
    handleDelete,
    handleCategoryClick,
    handleBack,
  }
}