import { BookType } from './books'

// Action types

export const LOAD_AUTHORS_REQUEST = 'LOAD_AUTHORS_REQUEST'
export const LOAD_AUTHORS_SUCCESS = 'LOAD_AUTHORS_SUCCESS'
export const LOAD_AUTHORS_FAILURE = 'LOAD_AUTHORS_FAILURE'

export const LOAD_AUTHOR_BY_ID_REQUEST = 'LOAD_AUTHOR_BY_ID_REQUEST'
export const LOAD_AUTHOR_BY_ID_SUCCESS = 'LOAD_AUTHOR_BY_ID_SUCCESS'
export const LOAD_AUTHOR_BY_ID_FAILURE = 'LOAD_AUTHOR_BY_ID_FAILURE'

export const ADD_AUTHOR_REQUEST = 'ADD_AUTHOR_REQUEST'
export const ADD_AUTHOR_SUCCESS = 'ADD_AUTHOR_SUCCESS'
export const ADD_AUTHOR_FAILURE = 'ADD_AUTHOR_FAILURE'

export const DELETE_AUTHOR_REQUEST = 'DELETE_AUTHOR_REQUEST'
export const DELETE_AUTHOR_SUCCESS = 'DELETE_AUTHOR_SUCCESS'
export const DELETE_AUTHOR_FAILURE = 'DELETE_AUTHOR_FAILURE'

export const UPDATE_AUTHOR_REQUEST = 'UPDATE_AUTHOR_REQUEST'
export const UPDATE_AUTHOR_SUCCESS = 'UPDATE_AUTHOR_SUCCESS'
export const UPDATE_AUTHOR_FAILURE = 'UPDATE_AUTHOR_FAILURE'

export const RESET_AUTHORS_LOADED_STATUS = 'RESET_AUTHORS_LOADED_STATUS'

export const RESET_AUTHORS_FORM_SNACKBAR = 'RESET_AUTHORS_FORM_SNACKBAR'

// Authors

export type AuthorType = {
  _id: string
  firstName: string
  lastName: string
  birthYear?: number
  biography?: string
  books?: BookType[]
}

export type AuthorPropType = {
  author: AuthorType
}

export type AuthorsPropType = {
  authors: AuthorType[]
}

// Actions

export type AuthorsActions =
  | LoadAuthorsRequestAction
  | LoadAuthorsSuccessAction
  | LoadAuthorsFailureAction
  | AddAuthorRequestAction
  | AddAuthorSuccessAction
  | AddAuthorFailureAction
  | ResetAuthorsFormSnackbarAction
  | ResetAuthorsLoadedStatusAction
  | DeleteAuthorRequestAction
  | DeleteAuthorSuccessAction
  | DeleteAuthorFailureAction
  | LoadAuthorByIdRequestAction
  | LoadAuthorByIdSuccessAction
  | LoadAuthorByIdFailureAction
  | UpdateAuthorRequestAction
  | UpdateAuthorSuccessAction
  | UpdateAuthorFailureAction

export type LoadAuthorsRequestAction = {
  type: typeof LOAD_AUTHORS_REQUEST
}

export type LoadAuthorsSuccessAction = {
  type: typeof LOAD_AUTHORS_SUCCESS
  payload: AuthorsPropType
}

export type LoadAuthorsFailureAction = {
  type: typeof LOAD_AUTHORS_FAILURE
  payload: {
    msg: string
  }
}

export type LoadAuthorByIdRequestAction = {
  type: typeof LOAD_AUTHOR_BY_ID_REQUEST
}

export type LoadAuthorByIdSuccessAction = {
  type: typeof LOAD_AUTHOR_BY_ID_SUCCESS
  payload: AuthorPropType
}

export type LoadAuthorByIdFailureAction = {
  type: typeof LOAD_AUTHOR_BY_ID_FAILURE
  payload: {
    msg: string
  }
}

export type AddAuthorRequestAction = {
  type: typeof ADD_AUTHOR_REQUEST
}

export type AddAuthorSuccessAction = {
  type: typeof ADD_AUTHOR_SUCCESS
  payload: AuthorPropType
}

export type AddAuthorFailureAction = {
  type: typeof ADD_AUTHOR_FAILURE
  payload: {
    msg: string
  }
}

export type DeleteAuthorRequestAction = {
  type: typeof DELETE_AUTHOR_REQUEST
}

export type DeleteAuthorSuccessAction = {
  type: typeof DELETE_AUTHOR_SUCCESS
  payload: number
}

export type DeleteAuthorFailureAction = {
  type: typeof DELETE_AUTHOR_FAILURE
  payload: {
    msg: string
  }
}

export type UpdateAuthorRequestAction = {
  type: typeof UPDATE_AUTHOR_REQUEST
}

export type UpdateAuthorSuccessAction = {
  type: typeof UPDATE_AUTHOR_SUCCESS
  payload: AuthorPropType
}

export type UpdateAuthorFailureAction = {
  type: typeof UPDATE_AUTHOR_FAILURE
  payload: {
    msg: string
  }
}

export type ResetAuthorsFormSnackbarAction = {
  type: typeof RESET_AUTHORS_FORM_SNACKBAR
}

export type ResetAuthorsLoadedStatusAction = {
  type: typeof RESET_AUTHORS_LOADED_STATUS
}

// State

export type AuthorsState = {
  authors: AuthorType[]
  author: AuthorType[]
  isAuthorsLoaded: boolean
  isAuthorAdded: boolean
  isAuthorUpdated: boolean
  isLoading: boolean
  error: string
  successCode: number
}
