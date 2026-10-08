import styled from 'styled-components'

export const Cloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.375rem 1rem;
  padding: 0.5rem 0;
`

export const Item = styled.span`
  display: inline-flex;
`

export const Word = styled.span<{ $size: number; $color: string }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ $size }) => $size}rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ $color }) => $color};
  cursor: default;
`

export const WordButton = styled.button<{ $size: number; $color: string }>`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ $size }) => $size}rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ $color }) => $color};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.125rem;
  }
`
