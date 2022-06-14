import browserHistory from '../../browser-history'
import { REDIRECT_TO_URL } from '../../types'

export const redirect = (_store: any) => (next: any) => (action: any) => {
  if (action.type === REDIRECT_TO_URL) {
    browserHistory.push(action.payload)
  }

  return next(action)
}
