import styled from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.surface};
`

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const NavButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const Separator = styled.div`
  height: 0.0625rem;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.3;
`