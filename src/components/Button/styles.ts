import styled, { css } from 'styled-components'
import type { ButtonProps } from './types'

const solidVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.primaryHover}; }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.surface};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.accentHover}; }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.surface};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.dangerHover}; }
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.surface};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.accentHover}; }
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.surface};
    &:hover:not(:disabled) { opacity: 0.9; }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) { background: ${({ theme }) => theme.colors.background}; }
  `,

    link: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 0;
    &:hover:not(:disabled) { color: ${({ theme }) => theme.colors.primary}; }
  `,

    overlay: css`
    background: rgba(0, 0, 0, 0.2);
    color: white;
    &:hover:not(:disabled) { background: rgba(0, 0, 0, 0.4); }
  `,

}

const softVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled) { opacity: 0.8; }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.accentLight};
    color: ${({ theme }) => theme.colors.accent};
    &:hover:not(:disabled) { opacity: 0.8; }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.dangerLight};
    color: ${({ theme }) => theme.colors.danger};
    &:hover:not(:disabled) { opacity: 0.8; }
  `,
  success: css`
    background: ${({ theme }) => theme.colors.successLight};
    color: ${({ theme }) => theme.colors.success};
    &:hover:not(:disabled) { opacity: 0.8; }
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warningLight};
    color: ${({ theme }) => theme.colors.warning};
    &:hover:not(:disabled) { opacity: 0.8; }
  `,
  ghost: css``,
  link: css``,
  
  overlay: css`
  
  `,
}

const sizes = {
  sm: css`padding: 0.375rem 0.875rem; font-size: 0.8125rem;`,
  md: css`padding: 0.625rem 1.25rem; font-size: 0.875rem;`,
  lg: css`padding: 0.875rem 1.75rem; font-size: 1rem;`,
}

export const StyledButton = styled.button<Pick<ButtonProps, '$variant' | '$size' | '$fullWidth' | '$soft' | '$iconOnly'>>`
  border: none;
  border-radius: ${({ theme, $iconOnly }) => $iconOnly ? theme.radii.full : theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  width: ${({ $fullWidth, $iconOnly }) => $fullWidth ? '100%' : $iconOnly ? '2rem' : 'auto'};
  height: ${({ $iconOnly }) => $iconOnly ? '2rem' : 'auto'};
  padding: ${({ $iconOnly }) => $iconOnly ? '0' : undefined};

  ${({ $variant = 'primary', $soft }) => $soft ? softVariants[$variant] : solidVariants[$variant]}
  ${({ $size = 'md', $iconOnly }) => !$iconOnly && sizes[$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
export const Content = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`