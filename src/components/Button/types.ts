export interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'warning' | 'link'
  $size?: 'sm' | 'md' | 'lg'
  $soft?: boolean
  $fullWidth?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}