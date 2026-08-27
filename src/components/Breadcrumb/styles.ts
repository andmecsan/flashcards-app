import styled from 'styled-components'

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
`

export const Link = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const Current = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`