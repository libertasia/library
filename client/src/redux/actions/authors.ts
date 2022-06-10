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
  AddAuthorFailureAction,
  ADD_AUTHOR_FAILURE,
  AddAuthorRequestAction,
  ADD_AUTHOR_REQUEST,
  AuthorPropType,
  AddAuthorSuccessAction,
  ADD_AUTHOR_SUCCESS,
  ResetAuthorsFormSnackbarAction,
  RESET_AUTHORS_FORM_SNACKBAR,
  ResetAuthorsLoadedStatusAction,
  RESET_AUTHORS_LOADED_STATUS,
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

export function addAuthorRequest(): AddAuthorRequestAction {
  return {
    type: ADD_AUTHOR_REQUEST,
  }
}

export function addAuthorSuccess(
  payload: AuthorPropType
): AddAuthorSuccessAction {
  return {
    type: ADD_AUTHOR_SUCCESS,
    payload,
  }
}

export function addAuthorFailure(msg: string): AddAuthorFailureAction {
  return {
    type: ADD_AUTHOR_FAILURE,
    payload: {
      msg,
    },
  }
}

export function resetAutorsError(): ResetAuthorsFormSnackbarAction {
  return {
    type: RESET_AUTHORS_FORM_SNACKBAR,
  }
}

export function resetAutorsLoadedStatus(): ResetAuthorsLoadedStatusAction {
  return {
    type: RESET_AUTHORS_LOADED_STATUS,
  }
}

// ----------------------------------------------------------------------

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

export function addNewAuthor(
  firstName: string,
  lastName: string,
  birthYear: string,
  biography: string
) {
  return async function (dispatch: ThunkDispatch<AuthorsState, void, Action>) {
    dispatch(addAuthorRequest())
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/authors/create`,
        { firstName, lastName, birthYear, biography },
        { withCredentials: true }
      )
      dispatch(addAuthorSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(addAuthorFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          addAuthorFailure('You are not authorized to perform this action')
        )
        return
      }
      dispatch(addAuthorFailure(`Something went wrong: ${error}`))
    }
  }
}
