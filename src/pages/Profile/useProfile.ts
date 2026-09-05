import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import type { ProfileData } from './types'

interface PasswordForm {
  current_password: string
  password: string
}

export const useProfile = () => {
  const navigate = useNavigate()
  const [showDelete, setShowDelete] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

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
      setSuccessMessage('Contraseña actualizada correctamente')
      setTimeout(() => setSuccessMessage(''), 3000)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => api.delete('/profile'),
    onSuccess: () => {
      localStorage.removeItem('token')
      navigate('/login')
      window.location.reload()
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
    successMessage,
    passwordError: updateMutation.error ? 'Contraseña actual incorrecta' : '',
    handleChangePassword,
    handleDelete,
  }
}