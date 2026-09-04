import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../services/api'

export const useImportPdf = (deckId: number, onClose: () => void) => {
  const queryClient = useQueryClient()
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')


  const importMutation = useMutation({
  mutationFn: (pdf: File) => {
    const formData = new FormData()
    formData.append('file', pdf)
    return api.post(`/decks/${deckId}/import`, formData, {
      headers: { 'Content-Type': undefined },
    })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories', String(deckId)] })
    onClose()
  },
  onError: () => {
    setError('Error al procesar el PDF. Inténtalo de nuevo.')
  },
})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected && selected.type === 'application/pdf') {
      setFile(selected)
      setError('')
    } else {
      setError('Solo se permiten archivos PDF')
    }
  }

  const handleSubmit = () => {
    if (!file) {
      setError('Selecciona un archivo PDF')
      return
    }
    importMutation.mutate(file)
  }

  return {
    file,
    error,
    loading: importMutation.isPending,
    handleFileChange,
    handleSubmit,
  }
}