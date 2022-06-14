import axios from 'axios'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { API_URL } from '../../config'

import {
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  LoadCurrentUserRequestAction,
  LoadCurrentUserSuccessAction,
  LoadCurrentUserFailureAction,
  UserType,
  UserState,
  UpdateUserRequestAction,
  UPDATE_USER_REQUEST,
  UpdateUserSuccessAction,
  UPDATE_USER_SUCCESS,
  UpdateUserFailureAction,
  UPDATE_USER_FAILURE,
} from '../../types'
import { redirectToUrl } from './ui'

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

export function updateUserRequest(): UpdateUserRequestAction {
  return {
    type: UPDATE_USER_REQUEST,
  }
}

export function updateUserSuccess(payload: UserType): UpdateUserSuccessAction {
  return {
    type: UPDATE_USER_SUCCESS,
    payload,
  }
}

export function updateUserFailure(msg: string): UpdateUserFailureAction {
  return {
    type: UPDATE_USER_FAILURE,
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
      const res = await axios.get(`${API_URL}/api/v1/users/current`, {
        withCredentials: true,
      })
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
        `${API_URL}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      )
      dispatch(redirectToUrl('/'))
    } catch (error: any) {
      console.log(error)
    }
  }
}

export function updateUser(userId?: string, role?: string) {
  return async function (dispatch: ThunkDispatch<UserState, void, Action>) {
    dispatch(updateUserRequest())
    try {
      const res = await axios.put(
        `${API_URL}/api/v1/users/${userId}/update`,
        { role },
        { withCredentials: true }
      )
      dispatch(updateUserSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(updateUserFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          updateUserFailure('You are not authorized to perform this action')
        )
        return
      }
      dispatch(updateUserFailure(`Something went wrong: ${error}`))
    }
  }
}
