import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

interface LoginForm {
  email: string
  password: string
}

interface RegisterForm {
  name: string
  email: string
  password: string
}

export const useLogin = (onLogin: (token: string) => void) => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  const loginForm = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  })

  const registerForm = useForm<RegisterForm>({
    defaultValues: { name: '', email: '', password: '' },
  })

  const handleLogin = loginForm.handleSubmit(async (data) => {
    try {
      setError('')
      const res = await axios.post(`${API_URL}/auth/login`, data)
      onLogin(res.data.token)
    } catch {
      setError('Email o contraseña incorrectos')
    }
  })

  const handleRegister = registerForm.handleSubmit(async (data) => {
    try {
      setError('')
      const res = await axios.post(`${API_URL}/auth/register`, data)
      onLogin(res.data.token)
    } catch {
      setError('No se pudo crear la cuenta. El email puede estar en uso.')
    }
  })

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google_oauth2`
  }

  const toggleMode = () => {
    setIsRegister(!isRegister)
    setError('')
  }

  return {
    isRegister,
    error,
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    toggleMode,
  }
}