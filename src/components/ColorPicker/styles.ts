import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`

export const ColorButton = styled.button<{ $color: string; $selected: boolean }>`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 2.5px solid ${({ $selected, theme }) => $selected ? theme.colors.text : 'transparent'};
  background: ${({ $color }) => $color};
  cursor: pointer;
  transition: border-color 0.15s, transform 0.15s;
  outline: ${({ $selected }) => $selected ? '2px solid white' : 'none'};
  outline-offset: -4px;

  &:hover {
    transform: scale(1.1);
  }
`