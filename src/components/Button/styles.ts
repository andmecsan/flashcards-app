import styled, { css } from 'styled-components'
import { ButtonProps } from './types'

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
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.background}; }
  `,
}

const sizes = {
  sm: css`padding: 6px 14px; font-size: 13px;`,
  md: css`padding: 10px 20px; font-size: 14px;`,
  lg: css`padding: 14px 28px; font-size: 16px;`,
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