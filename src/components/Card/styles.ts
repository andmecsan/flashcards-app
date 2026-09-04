import styled, { css } from 'styled-components'

export const Wrapper = styled.div<{ $variant: 'default' | 'stacked' }>`
  position: relative;
  cursor: pointer;
  transition: transform 0.15s;

  &:hover {
    transform: translateY(-0.125rem);
  }
${({ $variant }) => $variant === 'stacked' && css`
  padding-top: 0.75rem;
  padding-right: 0.75rem;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0.75rem;
    left: 0.75rem;
    background: ${({ theme }) => theme.colors.primaryMid};
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow: 0 0.25rem 0.5rem ${({ theme }) => theme.colors.primaryMid};
    z-index: 0;
  }
`}

  ${({ $variant }) => $variant === 'default' && css`
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow: 0 0.125rem 0.5rem ${({ theme }) => theme.colors.border};

    &:hover {
      box-shadow: 0 0.25rem 1rem ${({ theme }) => theme.colors.border};
    }
  `}
`


export const Content = styled.div<{ $variant: 'default' | 'stacked' }>`
  position: relative;
  z-index: 2;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};

  ${({ $variant, theme }) => $variant === 'default' && css`
    background: ${theme.colors.surface};
  `}

  ${({ $variant, theme }) => $variant === 'stacked' && css`
    background: ${theme.colors.primary};
  `}
`

export const Header = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.surface};
`

export const Body = styled.div<{ $variant: 'default' | 'stacked' }>`
  padding: ${({ $variant }) => $variant === 'stacked' ? '1.5rem' : '1rem'};
  padding-top: ${({ $variant }) => $variant === 'stacked' ? '2.5rem' : '1rem'};
  display: flex;
  flex-direction: column;
    ${({ $variant }) => $variant === 'stacked' && css`
    min-height: 12rem;
    justify-content: center;
    align-items: center;
  `}
`

export const Title = styled.h3<{ $variant: 'default' | 'stacked' }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 700;
  margin-bottom: 0.25rem;

  ${({ $variant, theme }) => $variant === 'stacked' && css`
    font-size: 1.25rem;
    font-style: italic;
    color: ${theme.colors.surface};
    text-align: center;
    margin-bottom: 0.5rem;
  `}

  ${({ $variant, theme }) => $variant === 'default' && css`
    font-size: 1rem;
    color: ${theme.colors.text};
  `}
`

export const Subtitle = styled.p<{ $variant: 'default' | 'stacked' }>`
  font-family: ${({ theme }) => theme.fonts.main};

  ${({ $variant, theme }) => $variant === 'stacked' && css`
    font-size: 0.8125rem;
    font-style: italic;
    color: ${theme.colors.primaryLight};
    text-align: center;
  `}

  ${({ $variant, theme }) => $variant === 'default' && css`
    font-size: 0.75rem;
    color: ${theme.colors.textSecondary};
  `}
`

export const Badge = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-left: 0.5rem;
`

export const Actions = styled.div<{ $variant: 'default' | 'stacked' }>`
  position: absolute;
  top: 0.5rem;
  display: flex;
  gap: 0.375rem;
  z-index: 3;

  ${({ $variant }) => $variant === 'stacked' && css`
    left: 0.5rem;
    right: 0.5rem;
    justify-content: space-between;
  `}

  ${({ $variant }) => $variant === 'default' && css`
    right: 0.5rem;
  `}
`

export const ActionButton = styled.button<{ $danger?: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  background: ${({ theme }) => theme.colors.primaryHover};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background: ${({ $danger, theme }) => $danger ? theme.colors.danger : theme.colors.primaryLight};
    color: ${({ $danger, theme }) => $danger ? theme.colors.surface : theme.colors.primary};
  }
`