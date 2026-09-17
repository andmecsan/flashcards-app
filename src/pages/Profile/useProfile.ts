import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { useAuth } from '../../context/useAuth'
import type { ProfileData } from './types'
import toast from 'react-hot-toast'

interface PasswordForm {
  current_password: string
  password: string
}

export const useProfile = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showDelete, setShowDelete] = useState(false)


  const { data: profile, isLoading } = useQuery<ProfileData>({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile').then(res => res.data),
  })

  const passwordForm = useForm<PasswordForm>({
    defaultValues: { current_password: '', password: '' },
  })

  const updateMutation = useMutation({
    mutationFn: (data: PasswordForm) => api.patch('/profile', data),
    onSuccess: () => {
    passwordForm.reset()
    toast.success('Contraseña actualizada correctamente')
  },
  })

  const deleteMutation = useMutation({
    mutationFn: () => api.delete('/profile'),
    onSuccess: () => {
      logout()
      toast.success('Cuenta eliminada')
      navigate('/login')
    },
  })

  const handleChangePassword = passwordForm.handleSubmit((data) => {
    updateMutation.mutate(data)
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  return {
    profile,
    loading: isLoading,
    passwordForm,
    showDelete, setShowDelete,
    passwordError: updateMutation.error ? 'Contraseña actual incorrecta' : '',
    handleChangePassword,
    handleDelete,
  }
}