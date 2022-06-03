import { Theme } from '@mui/material'

declare module '@mui/material' {
  interface Theme {
    customShadows: {
      z1: string
      z8: string
      z12: string
      z16: string
      z20: string
      z24: string
      primary: string
      secondary: string
      info: string
      success: string
      warning: string
      error: string
    }
  }

  interface ThemeOptions {
    customShadows?: {
      z1?: string
      z8?: string
      z12?: string
      z16?: string
      z20?: string
      z24?: string
      primary?: string
      secondary?: string
      info?: string
      success?: string
      warning?: string
      error?: string
    }
  }
}

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  }
}
