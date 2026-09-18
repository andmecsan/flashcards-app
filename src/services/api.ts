import axios from 'axios'

const API_ROOT = import.meta.env.VITE_API_ROOT || 'http://localhost:3000'

export const authApi = axios.create({
  baseURL: API_ROOT,
})

export const api = axios.create({
  baseURL: `${API_ROOT}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)