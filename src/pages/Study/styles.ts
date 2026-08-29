import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
`

export const StudyCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  width: 100%;
  max-width: 44rem;
  min-height: 28rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.5rem 2rem ${({ theme }) => theme.colors.border};
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
`

export const Progress = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const FlipButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
`

export const CardLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`

export const CardText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  line-height: 1.4;
`

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const RatingButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const CompletedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 4rem 2rem;
`

export const CompletedTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const CompletedMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`