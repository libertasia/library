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
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  BooksActions,
  RESET_BOOKS_LOADED_STATUS,
  LOAD_AUTHOR_BY_ID_REQUEST,
  LOAD_AUTHOR_BY_ID_SUCCESS,
  LOAD_AUTHOR_BY_ID_FAILURE,
  UPDATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_FAILURE,
} from '../../types'

const initialState: AuthorsState = {
  authors: [],
  author: [],
  isAuthorsLoaded: false,
  isAuthorAdded: false,
  isLoading: false,
  error: '',
  successCode: 0,
  isAuthorUpdated: false,
}

export function authorsReducer(
  state = initialState,
  action: AuthorsActions | BooksActions
) {
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
  case LOAD_AUTHOR_BY_ID_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case LOAD_AUTHOR_BY_ID_SUCCESS:
    return {
      ...state,
      author: action.payload,
      isLoading: false,
    }
  case LOAD_AUTHOR_BY_ID_FAILURE:
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
      isAuthorUpdated: false,
    }
  case RESET_AUTHORS_LOADED_STATUS:
    return {
      ...state,
      isAuthorsLoaded: false,
      successCode: 0,
      error: '',
    }
  case RESET_BOOKS_LOADED_STATUS:
    return {
      ...state,
      successCode: 0,
      error: '',
    }
  case DELETE_AUTHOR_REQUEST:
    return {
      ...state,
      isLoading: true,
      error: '',
    }
  case DELETE_AUTHOR_SUCCESS:
    return {
      ...state,
      successCode: action.payload,
      isLoading: false,
      isAuthorsLoaded: false,
      error: '',
    }
  case DELETE_AUTHOR_FAILURE:
    return {
      ...state,
      error: action.payload.msg,
      isLoading: false,
    }
  case UPDATE_AUTHOR_REQUEST:
    return {
      ...state,
      isAuthorUpdated: false,
      isLoading: true,
      error: '',
    }
  case UPDATE_AUTHOR_SUCCESS:
    return {
      ...state,
      author: action.payload,
      isLoading: false,
      isAuthorUpdated: true,
      isAuthorsLoaded: false,
      error: '',
    }
  case UPDATE_AUTHOR_FAILURE:
    return {
      ...state,
      error: action.payload.msg,
      isLoading: false,
    }
  default:
    return state
  }
}
