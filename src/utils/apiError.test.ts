import { describe, it, expect } from 'vitest'
import { AxiosError } from 'axios'
import { getApiErrorMessage } from './apiError'

describe('getApiErrorMessage', () => {
  it('devuelve el primer mensaje de error de la respuesta de la API', () => {
    const error = new AxiosError('Request failed')
    error.response = {
      data: { errors: ['El email ya está en uso', 'Otro error'] },
      status: 422,
      statusText: 'Unprocessable Entity',
      headers: {},
      config: {} as never,
    }

    expect(getApiErrorMessage(error, 'fallback')).toBe('El email ya está en uso')
  })

  it('devuelve el fallback si la respuesta no tiene errores', () => {
    const error = new AxiosError('Request failed')
    error.response = {
      data: {},
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: {} as never,
    }

    expect(getApiErrorMessage(error, 'fallback')).toBe('fallback')
  })

  it('devuelve el fallback si el error no es un AxiosError', () => {
    expect(getApiErrorMessage(new Error('boom'), 'fallback')).toBe('fallback')
    expect(getApiErrorMessage('boom', 'fallback')).toBe('fallback')
    expect(getApiErrorMessage(undefined, 'fallback')).toBe('fallback')
  })
})
