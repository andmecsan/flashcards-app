import styled from 'styled-components'

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.06);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  }
`

export const Header = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  height: 8rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.danger};
  }
`

export const Icon = styled.span`
  font-size: 2rem;
  color: white;
  opacity: 0.9;
`

export const Body = styled.div`
  padding: 1rem;
`

export const Name = styled.h3`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`

export const Meta = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const DueBadge = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-left: 0.5rem;
`