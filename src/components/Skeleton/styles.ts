import styled, { keyframes } from 'styled-components'
import type { SkeletonProps } from './types'

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`

export const SkeletonBox = styled.div<SkeletonProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
  border-radius: ${({ $borderRadius, theme }) => $borderRadius || theme.radii.sm};
  background: ${({ theme }) => theme.colors.border};
  animation: ${pulse} 1.5s ease-in-out infinite;
`

export const CardSkeletonWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: 0 0.0625rem 0.25rem ${({ theme }) => theme.colors.border};
`

export const CardSkeletonHeader = styled.div`
  height: 8rem;
  background: ${({ theme }) => theme.colors.border};
  animation: ${pulse} 1.5s ease-in-out infinite;
`

export const CardSkeletonBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`