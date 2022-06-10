import {
  AuthorsState,
  AuthorsActions,
  LOAD_AUTHORS_REQUEST,
  LOAD_AUTHORS_SUCCESS,
  LOAD_AUTHORS_FAILURE,
  ADD_AUTHOR_FAILURE,
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  RESET_AUTHORS_FORM_SNACKBAR,
  RESET_AUTHORS_LOADED_STATUS,
} from '../../types'

const initialState: AuthorsState = {
  authors: [],
  author: [],
  isAuthorsLoaded: false,
  isAuthorAdded: false,
  isLoading: false,
  error: '',
}

export function authorsReducer(state = initialState, action: AuthorsActions) {
  switch (action.type) {
  case LOAD_AUTHORS_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case LOAD_AUTHORS_SUCCESS:
    return {
      ...state,
      authors: action.payload,
      isLoading: false,
      isAuthorsLoaded: true,
    }
  case LOAD_AUTHORS_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    }
  case ADD_AUTHOR_REQUEST:
    return {
      ...state,
      isAuthorAdded: false,
      isLoading: true,
      error: '',
    }
  case ADD_AUTHOR_SUCCESS:
    return {
      ...state,
      author: action.payload,
      isLoading: false,
      isAuthorAdded: true,
      isAuthorsLoaded: false,
      error: '',
    }
  case ADD_AUTHOR_FAILURE:
    return {
      ...state,
      error: action.payload.msg,
      isLoading: false,
    }
  case RESET_AUTHORS_FORM_SNACKBAR:
    return {
      ...state,
      error: '',
      isAuthorAdded: false,
    }
  case RESET_AUTHORS_LOADED_STATUS:
    return {
      ...state,
      isAuthorsLoaded: false,
    }
  default:
    return state
  }
}
