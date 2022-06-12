import axios from 'axios'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import {
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  LoadCurrentUserRequestAction,
  LoadCurrentUserSuccessAction,
  LoadCurrentUserFailureAction,
  UserType,
  UserState,
} from '../../types'

export function loadCurrentUserRequest(): LoadCurrentUserRequestAction {
  return {
    type: LOAD_CURRENT_USER_REQUEST,
  }
}

export function loadCurrentUserSuccess(
  payload: UserType
): LoadCurrentUserSuccessAction {
  return {
    type: LOAD_CURRENT_USER_SUCCESS,
    payload,
  }
}

export function loadCurrentUserFailure(
  msg: string
): LoadCurrentUserFailureAction {
  return {
    type: LOAD_CURRENT_USER_FAILURE,
    payload: {
      msg,
    },
  }
}

// ----------------------------------------------------------------------

export function getCurrentUser() {
  return async function (dispatch: ThunkDispatch<UserState, void, Action>) {
    dispatch(loadCurrentUserRequest())
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/users/current',
        { withCredentials: true }
      )
      const user = res.data
      dispatch(loadCurrentUserSuccess(user))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(loadCurrentUserFailure('Resourse is not found'))
        return
      }
      dispatch(loadCurrentUserFailure('Something went wrong'))
    }
  }
}

export function logoutUser() {
  return async function (dispatch: ThunkDispatch<UserState, void, Action>) {
    try {
      await axios.post(
        'http://localhost:5000/api/v1/auth/logout',
        {},
        { withCredentials: true }
      )
    } catch (error: any) {
      console.log(error)
    }
  }
}
