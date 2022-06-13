import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'

import { AppState } from './types'
import { RBAC_RULES } from './roles'
import { UserState } from './types'
import { getCurrentUser } from './redux/actions'

const check = (rules: any, role: any, action: any) => {
  const permissions = rules[role]
  if (!permissions) {
    // role is not present in the rules
    return false
  }

  const staticPermissions = permissions.view
  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true
  }
  const dynamicPermissions = permissions.actions
  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions.includes(action)
    if (!permissionCondition) {
      return false
    }

    return true
  }
  return false
}

const Can = ({ perform, yes, no }: any) => {
  const dispatch = useDispatch()

  const { user } = useSelector((state: AppState) => state.user)

  const isLoggedIn = user?.email ? true : false
  const userRole = isLoggedIn ? user?.role : 'ANONYMOUS'

  useEffect(() => {
    ;(dispatch as ThunkDispatch<UserState, void, Action>)(getCurrentUser())
  }, [])

  return check(RBAC_RULES, userRole, perform) ? yes() : no()
}

Can.defaultProps = {
  yes: () => null,
  no: () => null,
  perform: '',
}

export default Can
