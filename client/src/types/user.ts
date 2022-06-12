import { BooksPropType } from './books'

// Action types

export const LOAD_CURRENT_USER_REQUEST = 'LOAD_CURRENT_USER_REQUEST'
export const LOAD_CURRENT_USER_SUCCESS = 'LOAD_CURRENT_USER_SUCCESS'
export const LOAD_CURRENT_USER_FAILURE = 'LOAD_CURRENT_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'

// User

export type UserType = {
  _id: string
  firstName: string
  lastName: string
  email: string
  userName: string
  borrowedBooks: BooksPropType
  role: string
}
export type UserPropType = {
  user: UserType
}

// Actions

export type UserActions =
  | LoadCurrentUserRequestAction
  | LoadCurrentUserSuccessAction
  | LoadCurrentUserFailureAction

export type LoadCurrentUserRequestAction = {
  type: typeof LOAD_CURRENT_USER_REQUEST
}

export type LoadCurrentUserSuccessAction = {
  type: typeof LOAD_CURRENT_USER_SUCCESS
  payload: UserType
}

export type LoadCurrentUserFailureAction = {
  type: typeof LOAD_CURRENT_USER_FAILURE
  payload: {
    msg: string
  }
}

export type LogoutUserAction = {
  type: typeof LOGOUT_USER
}

// State

export type UserState = {
  user: UserType | null
  isLoading: boolean
  error: string
}
