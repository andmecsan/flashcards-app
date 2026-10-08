import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { PersonalTag, PredefinedTags } from '../utils/tags'

/** Etiquetas personales del usuario (para sugerencias y filtros). */
export const usePersonalTags = () =>
  useQuery<PersonalTag[]>({
    queryKey: ['tags'],
    queryFn: () => api.get('/tags').then((res) => res.data),
  })

/** Áreas, niveles y cursos del sistema; casi nunca cambian. */
export const usePredefinedTags = () =>
  useQuery<PredefinedTags>({
    queryKey: ['tags', 'system'],
    queryFn: () => api.get('/tags/system').then((res) => res.data),
    staleTime: 60 * 60 * 1000,
  })
