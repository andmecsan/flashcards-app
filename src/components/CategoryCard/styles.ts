import styled from 'styled-components'

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 12rem;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.5rem 1.5rem ${({ theme }) => theme.colors.primaryHover};
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

export const IconButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.colors.primaryHover};
  color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const Name = styled.h3`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  margin-bottom: 0.5rem;
`

export const CardCount = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.primaryLight};
  text-align: center;
`

export const StudyButton = styled.button`
  margin-top: auto;
  padding: 0.5rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: ${({ theme }) => theme.colors.primaryHover};
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  align-self: center;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`