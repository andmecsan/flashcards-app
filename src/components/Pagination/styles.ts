import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 0;
  margin-top: auto;
`

export const PageButton = styled.button<{ $active?: boolean }>`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ $active, theme }) => $active ? theme.colors.surface : theme.colors.textSecondary};
  box-shadow: ${({ $active }) => $active ? 'none' : '0 0.0625rem 0.125rem rgba(0,0,0,0.06)'};

  &:hover:not(:disabled) {
    background: ${({ $active, theme }) => $active ? theme.colors.primaryHover : theme.colors.background};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`