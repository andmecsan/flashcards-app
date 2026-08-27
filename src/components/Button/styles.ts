import styled, { css } from 'styled-components'
import type { ButtonProps } from './types'

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.primaryHover}; }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.accentHover}; }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: white;
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.dangerHover}; }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 0.0625rem solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.background}; }
  `,
}

const sizes = {
  sm: css`padding: 0.375rem 0.875rem; font-size: 0.8125rem;`,
  md: css`padding: 0.625rem 1.25rem; font-size: 0.875rem;`,
  lg: css`padding: 0.875rem 1.75rem; font-size: 1rem;`,
}

export const StyledButton = styled.button<Pick<ButtonProps, '$variant' | '$size' | '$fullWidth'>>`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};

  ${({ $variant = 'primary' }) => variants[$variant]}
  ${({ $size = 'md' }) => sizes[$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`