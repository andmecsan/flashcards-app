import styled from 'styled-components'

export const Content = styled.div`
  max-width: 32rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.5rem;
  box-shadow: 0 0.0625rem 0.25rem ${({ theme }) => theme.colors.border};
`

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`

export const InfoLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const InfoValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

export const Badge = styled.span<{ $color: string; $bg: string }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-left: 0.5rem;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SuccessText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.success};
  text-align: center;
`

export const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
`

export const DangerSection = styled(Section)`
  border: 1px solid ${({ theme }) => theme.colors.dangerLight};
`

export const DangerText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.5;
`