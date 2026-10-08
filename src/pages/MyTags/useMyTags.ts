import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { api } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'
import { normalizeTag, type PersonalTag } from '../../utils/tags'
import { usePersonalTags } from '../../hooks/useTags'

/** Todo lo que cuelga de una etiqueta (tarjetas, filtros, estadísticas) se vuelve a pedir. */
const REFRESH_KEYS = ['tags', 'cards', 'categories', 'deck-stats', 'stats', 'study']

export const useMyTags = () => {
  const queryClient = useQueryClient()
  const { data: tags = [], isLoading } = usePersonalTags()
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<PersonalTag | null>(null)
  const [renameError, setRenameError] = useState('')
  const [deleting, setDeleting] = useState<PersonalTag | null>(null)
  const [merging, setMerging] = useState<PersonalTag | null>(null)

  const refresh = () =>
    REFRESH_KEYS.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }))

  const filtered = search.trim()
    ? tags.filter((tag) => normalizeTag(tag.name).includes(normalizeTag(search)))
    : tags

  const renameMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => api.patch(`/tags/${id}`, { name }),
    onSuccess: () => {
      refresh()
      setEditing(null)
      setRenameError('')
      toast.success('Etiqueta renombrada')
    },
    onError: (error: unknown) => setRenameError(getApiErrorMessage(error, 'No se pudo renombrar')),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/tags/${id}`),
    onSuccess: () => {
      refresh()
      setDeleting(null)
      toast.success('Etiqueta eliminada')
    },
    onError: () => toast.error('No se pudo eliminar la etiqueta'),
  })

  const startEditing = (tag: PersonalTag) => {
    setEditing(tag)
    setRenameError('')
  }

  return {
    tags: filtered,
    total: tags.length,
    loading: isLoading,
    search,
    setSearch,
    editing,
    startEditing,
    cancelEditing: () => setEditing(null),
    renameError,
    rename: (tag: PersonalTag, name: string) => renameMutation.mutate({ id: tag.id, name }),
    renaming: renameMutation.isPending,
    deleting,
    askDelete: setDeleting,
    confirmDelete: () => deleting && deleteMutation.mutate(deleting.id),
    merging,
    askMerge: setMerging,
    refresh,
    allTags: tags,
  }
}
