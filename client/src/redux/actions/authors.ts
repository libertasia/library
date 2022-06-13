import axios from 'axios'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { API_URL } from '../../config'

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
  DeleteAuthorRequestAction,
  DELETE_AUTHOR_REQUEST,
  DeleteAuthorSuccessAction,
  DELETE_AUTHOR_SUCCESS,
  DeleteAuthorFailureAction,
  DELETE_AUTHOR_FAILURE,
  LoadAuthorByIdRequestAction,
  LOAD_AUTHOR_BY_ID_REQUEST,
  LoadAuthorByIdSuccessAction,
  LOAD_AUTHOR_BY_ID_SUCCESS,
  LoadAuthorByIdFailureAction,
  LOAD_AUTHOR_BY_ID_FAILURE,
  UpdateAuthorRequestAction,
  UPDATE_AUTHOR_REQUEST,
  UpdateAuthorSuccessAction,
  UPDATE_AUTHOR_SUCCESS,
  UpdateAuthorFailureAction,
  UPDATE_AUTHOR_FAILURE,
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

export function loadAuthorByIdRequest(): LoadAuthorByIdRequestAction {
  return {
    type: LOAD_AUTHOR_BY_ID_REQUEST,
  }
}

export function loadAuthorByIdSuccess(
  payload: AuthorsPropType
): LoadAuthorByIdSuccessAction {
  return {
    type: LOAD_AUTHOR_BY_ID_SUCCESS,
    payload,
  }
}

export function loadAuthorByIdFailure(
  msg: string
): LoadAuthorByIdFailureAction {
  return {
    type: LOAD_AUTHOR_BY_ID_FAILURE,
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

export function resetAuthorsFormSnackbar(): ResetAuthorsFormSnackbarAction {
  return {
    type: RESET_AUTHORS_FORM_SNACKBAR,
  }
}

export function resetAutorsLoadedStatus(): ResetAuthorsLoadedStatusAction {
  return {
    type: RESET_AUTHORS_LOADED_STATUS,
  }
}

export function deleteAuthorRequest(): DeleteAuthorRequestAction {
  return {
    type: DELETE_AUTHOR_REQUEST,
  }
}

export function deleteAuthorSuccess(status: number): DeleteAuthorSuccessAction {
  return {
    type: DELETE_AUTHOR_SUCCESS,
    payload: status,
  }
}

export function deleteAuthorFailure(msg: string): DeleteAuthorFailureAction {
  return {
    type: DELETE_AUTHOR_FAILURE,
    payload: {
      msg,
    },
  }
}

export function updateAuthorRequest(): UpdateAuthorRequestAction {
  return {
    type: UPDATE_AUTHOR_REQUEST,
  }
}

export function updateAuthorSuccess(
  payload: AuthorPropType
): UpdateAuthorSuccessAction {
  return {
    type: UPDATE_AUTHOR_SUCCESS,
    payload,
  }
}

export function updateAuthorFailure(msg: string): UpdateAuthorFailureAction {
  return {
    type: UPDATE_AUTHOR_FAILURE,
    payload: {
      msg,
    },
  }
}

// ----------------------------------------------------------------------

export function getAuthors() {
  return async function (dispatch: ThunkDispatch<AuthorsState, void, Action>) {
    dispatch(loadAuthorsRequest())
    try {
      const res = await axios.get(`${API_URL}/api/v1/authors`)
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

export function getAuthorById(_id: string) {
  return async function (dispatch: ThunkDispatch<AuthorsState, void, Action>) {
    dispatch(loadAuthorByIdRequest())
    try {
      const res = await axios.get(`${API_URL}/api/v1/authors/${_id}`)
      dispatch(loadAuthorByIdSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(loadAuthorByIdFailure('Resourse is not found'))
        return
      }
      dispatch(loadAuthorByIdFailure('Something went wrong'))
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
        `${API_URL}/api/v1/authors/create`,
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

export function deleteAuthor(_id: string) {
  return async function (dispatch: ThunkDispatch<AuthorsState, void, Action>) {
    dispatch(deleteAuthorRequest())
    try {
      const res = await axios.delete(
        `${API_URL}/api/v1/authors/${_id}/delete`,
        { withCredentials: true }
      )
      dispatch(deleteAuthorSuccess(res.status))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(deleteAuthorFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          deleteAuthorFailure('You are not authorized to perform this action')
        )
        return
      }
      if (error.response.status === 417) {
        dispatch(deleteAuthorFailure("Author with books can't be deleted"))
        return
      }
      dispatch(deleteAuthorFailure(`Something went wrong: ${error}`))
    }
  }
}

export function updateAuthor(
  _id: string,
  firstName: string,
  lastName: string,
  birthYear: number,
  biography: string
) {
  return async function (dispatch: ThunkDispatch<AuthorsState, void, Action>) {
    dispatch(updateAuthorRequest())
    try {
      const res = await axios.put(
        `${API_URL}/api/v1/authors/${_id}/update`,
        { firstName, lastName, birthYear, biography },
        { withCredentials: true }
      )
      dispatch(updateAuthorSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(updateAuthorFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          updateAuthorFailure('You are not authorized to perform this action')
        )
        return
      }
      dispatch(updateAuthorFailure(`Something went wrong: ${error}`))
    }
  }
}
