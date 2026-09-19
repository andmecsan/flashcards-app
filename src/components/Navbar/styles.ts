import styled from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0.875rem 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.75rem 1rem;
  }
`

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const NavItem = styled.div`
  position: relative;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -2.25rem;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.surface};
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 0.6875rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: ${({ theme }) => theme.radii.sm};
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (hover: none) {
    &::after {
      display: none;
    }
  }
`

export const Separator = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.3;
`