export interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'warning' | 'link' | 'overlay'
  $size?: 'sm' | 'md' | 'lg'
  $soft?: boolean
  $fullWidth?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
  $iconOnly?: boolean
  type?: 'button' | 'submit'
}