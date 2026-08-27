import styled from 'styled-components'

export const PageWrapper = styled.div`
  min-height: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 1.25rem;
`

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 26.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.08);
`


export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
`

export const Divider = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: ${({ theme }) => theme.colors.border};
  margin: 1.5rem 0;
`

export const GoogleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 0.0625rem solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const GoogleIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
`

export const Footer = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-top: 1.5rem;
  line-height: 1.5;
`