import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { Deck } from './types'

export const useDashboard = () => {
  const [decks, setDecks] = useState<Deck[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/decks')
      .then(res => setDecks(res.data))
      .catch(err => console.error('Error cargando mazos:', err))
      .finally(() => setLoading(false))
  }, [])

  //TODO: Move this to backend
  const filteredDecks = decks.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: number) => {
    if (!window.confirm('¿Eliminar este mazo?')) return
    api.delete(`/decks/${id}`)
      .then(() => setDecks(prev => prev.filter(d => d.id !== id)))
      .catch(err => console.error('Error eliminando mazo:', err))
  }

 return { decks: filteredDecks, search, setSearch, loading, handleDelete }
}