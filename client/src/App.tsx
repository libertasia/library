import { useEffect } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'

import ThemeProvider from './theme'
import AppRoutes from './Routes'
import { UserState } from './types'
import { getCurrentUser } from './redux/actions'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    ;(dispatch as ThunkDispatch<UserState, void, Action>)(getCurrentUser())
  }, [dispatch])

  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}
