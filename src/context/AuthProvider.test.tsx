import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderHook } from '@testing-library/react'
import { AuthProvider } from './AuthProvider'
import { useAuth } from './useAuth'

const TestConsumer = () => {
  const { token, login, logout } = useAuth()
  return (
    <div>
      <span data-testid="token">{token ?? 'sin-token'}</span>
      <button onClick={() => login('nuevo-token')}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

describe('AuthProvider / useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('arranca sin token cuando localStorage está vacío', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    expect(screen.getByTestId('token')).toHaveTextContent('sin-token')
  })

  it('arranca con el token que hubiera en localStorage', () => {
    localStorage.setItem('token', 'token-existente')

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    expect(screen.getByTestId('token')).toHaveTextContent('token-existente')
  })

  it('login guarda el token en localStorage y actualiza el estado', async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await user.click(screen.getByText('login'))

    expect(screen.getByTestId('token')).toHaveTextContent('nuevo-token')
    expect(localStorage.getItem('token')).toBe('nuevo-token')
  })

  it('logout limpia localStorage y el estado', async () => {
    localStorage.setItem('token', 'token-existente')
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    )

    await user.click(screen.getByText('logout'))

    expect(screen.getByTestId('token')).toHaveTextContent('sin-token')
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('useAuth lanza un error si se usa fuera de AuthProvider', () => {
    const { result } = renderHook(() => {
      try {
        return useAuth()
      } catch (error) {
        return error as Error
      }
    })

    expect(result.current).toBeInstanceOf(Error)
    expect((result.current as Error).message).toMatch(/AuthProvider/)
  })
})
