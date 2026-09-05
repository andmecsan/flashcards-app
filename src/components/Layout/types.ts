import type { BreadcrumbItem } from '../Breadcrumb/types'

export interface LayoutProps {
  children: React.ReactNode
  breadcrumb?: BreadcrumbItem[]
  loading?: boolean
  loadingMessage?: string
}