import axios from 'axios'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import {
  LoadAuthorsRequestAction,
  LOAD_AUTHORS_REQUEST,
  AuthorsPropType,
  LoadAuthorsSuccessAction,
  LOAD_AUTHORS_SUCCESS,
  LoadAuthorsFailureAction,
  AuthorsState,
  LOAD_AUTHORS_FAILURE,
} from '../../types'

export function loadAuthorsRequest(): LoadAuthorsRequestAction {
  return {
    type: LOAD_AUTHORS_REQUEST,
  }
}

export function loadAuthorsSuccess(
  payload: AuthorsPropType
): LoadAuthorsSuccessAction {
  return {
    type: LOAD_AUTHORS_SUCCESS,
    payload,
  }
}

export function loadAuthorsFailure(msg: string): LoadAuthorsFailureAction {
  return {
    type: LOAD_AUTHORS_FAILURE,
    payload: {
      msg,
    },
  }
}

export function getAuthors() {
  return async function (dispatch: ThunkDispatch<AuthorsState, void, Action>) {
    dispatch(loadAuthorsRequest())
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/authors`)
      dispatch(loadAuthorsSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(loadAuthorsFailure('Resourse is not found'))
        return
      }
      dispatch(loadAuthorsFailure('Something went wrong'))
    }
  }
}
