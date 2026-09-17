export interface CardProps {
  $variant?: 'default' | 'stacked'
  $highlighted?: boolean
  title: string
  subtitle?: string
  badge?: string
  icon?: React.ReactNode
  headerColor?: string
  children?: React.ReactNode
  onClick?: () => void
  onDelete?: () => void
  onEdit?: () => void
}