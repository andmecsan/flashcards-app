import 'styled-components'
import type { ThemeType } from './styles/theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- declaration merging with styled-components' own DefaultTheme requires an interface, not a type alias
  export interface DefaultTheme extends ThemeType {}
}