import type { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  fontFamily: 'Roboto',
  respectReducedMotion: true,

  breakpoints: {
    xs: 500,
    sm: 800,
    md: 1000,
    lg: 1200,
    xl: 1400
  }
}
