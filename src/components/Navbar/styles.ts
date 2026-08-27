import styled from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.surface};
`

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const NavButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

export const Separator = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.3;
`