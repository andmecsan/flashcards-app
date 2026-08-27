import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 0;
`

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 0.1875rem solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`

export const Message = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`