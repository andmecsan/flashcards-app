export interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  $size?: 'sm' | 'md' | 'lg'
  $fullWidth?: boolean
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
  icon?: React.ReactNode
}