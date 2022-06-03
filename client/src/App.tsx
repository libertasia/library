import React from 'react'

import ThemeProvider from './theme'
import AppRoutes from './Routes'

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}
