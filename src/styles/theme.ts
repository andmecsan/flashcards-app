export const colors = {
  // Primary — violeta eléctrico
  primary: '#7C3AED',
  primaryHover: '#6D28D9',
  primaryLight: '#F3E8FF',

  // Accent — teal
  accent: '#5DCAA5',
  accentHover: '#4DB896',
  accentLight: '#E1F5EE',

  // Neutrales
  background: '#FAF5FF',
  surface: '#FFFFFF',
  text: '#2D2D2D',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',

  // Semánticos
  success: '#5DCAA5',
  successLight: '#E1F5EE',
  warning: '#EF9F27',
  warningLight: '#FAEEDA',
  danger: '#E24B4A',
  dangerHover: '#C93B3A',
  dangerLight: '#FCEBEB',
} as const;

export const fonts = {
  main: "'Mulish', sans-serif",
} as const;

export const radii = {
  sm: '6px',
  md: '10px',
  lg: '16px',
  full: '9999px',
} as const;

export const theme = {
  colors,
  fonts,
  radii,
} as const;

export type ThemeType = typeof theme;