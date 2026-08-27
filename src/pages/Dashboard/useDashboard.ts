import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'
import type{ Deck } from './types'

export const useDashboard = () => {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const { data: decks = [], isLoading } = useQuery<Deck[]>({
    queryKey: ['decks'],
    queryFn: () => api.get('/decks').then(res => res.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/decks/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['decks'] }),
  })

//TODO: Move this to backend
  const filteredDecks = decks.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (!window.confirm('¿Eliminar este mazo?')) return
    deleteMutation.mutate(id)
  }

  return {
    decks: filteredDecks,
    search, setSearch,
    loading: isLoading,
    showModal, setShowModal,
    handleDelete,
  }
}