import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
`

export const CardContainer = styled.div`
  width: 100%;
  max-width: 44rem;
  min-height: 28rem;
  perspective: 1000px;
`

export const CardInner = styled.div<{ $flipped: boolean }>`
  width: 100%;
  min-height: 28rem;
  position: relative;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => $flipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`

export const CardFace = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 0.5rem 2rem ${({ theme }) => theme.colors.border};
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
`

export const CardFaceBack = styled(CardFace)`
  transform: rotateY(180deg);
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

export const HintText = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 4rem 2rem;
`

export const EmptyTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`

export const EmptyMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`