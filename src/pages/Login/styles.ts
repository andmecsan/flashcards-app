import styled from 'styled-components'

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 20px;
`

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`

export const LogoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

export const LogoText = styled.h1`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.5;
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 24px 0;
`

export const GoogleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 15px;
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
  width: 20px;
  height: 20px;
`

export const Footer = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-top: 24px;
  line-height: 1.5;
`