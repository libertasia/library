import {
  BooksActions,
  BooksState,
  LOAD_BOOKS_REQUEST,
  LOAD_BOOKS_SUCCESS,
  LOAD_BOOKS_FAILURE,
  LOAD_BOOKS_COUNT_SUCCESS,
  LOAD_BOOKS_COUNT_REQUEST,
  LOAD_BOOKS_COUNT_FAILURE,
  RESET_BOOKS_LOADED_STATUS,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  RESET_BOOKS_FORM_SNACKBAR,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  AuthorsActions,
  RESET_AUTHORS_LOADED_STATUS,
  LOAD_BOOK_BY_ID_REQUEST,
  LOAD_BOOK_BY_ID_SUCCESS,
  LOAD_BOOK_BY_ID_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
} from '../../types'

const initialState: BooksState = {
  books: [],
  book: [],
  booksCount: 0,
  isBooksLoaded: false,
  isBooksCountLoaded: false,
  isBookLoaded: false,
  isBookAdded: false,
  isBookUpdated: false,
  isLoading: false,
  error: '',
  successCode: 0,
}

export function booksReducer(
  state = initialState,
  action: BooksActions | AuthorsActions
) {
  switch (action.type) {
  case RESET_BOOKS_LOADED_STATUS:
    return {
      ...state,
      isBooksLoaded: false,
      successCode: 0,
      error: '',
    }
  case RESET_AUTHORS_LOADED_STATUS:
    return {
      ...state,
      successCode: 0,
      error: '',
    }
  case LOAD_BOOKS_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case LOAD_BOOKS_SUCCESS:
    return {
      ...state,
      books: action.payload,
      isLoading: false,
      isBooksLoaded: true,
    }
  case LOAD_BOOKS_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    }
  case LOAD_BOOKS_COUNT_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case LOAD_BOOKS_COUNT_SUCCESS:
    return {
      ...state,
      booksCount: action.payload,
      isLoading: false,
      isBooksCountLoaded: true,
    }
  case LOAD_BOOKS_COUNT_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    }
  case LOAD_BOOK_BY_ID_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case LOAD_BOOK_BY_ID_SUCCESS:
    return {
      ...state,
      book: action.payload,
      isLoading: false,
    }
  case LOAD_BOOK_BY_ID_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    }
  case ADD_BOOK_REQUEST:
    return {
      ...state,
      isBookAdded: false,
      isLoading: true,
      error: '',
    }
  case ADD_BOOK_SUCCESS:
    return {
      ...state,
      book: action.payload,
      isLoading: false,
      isBookAdded: true,
      isBooksLoaded: false,
      error: '',
    }
  case ADD_BOOK_FAILURE:
    return {
      ...state,
      error: action.payload.msg,
      isLoading: false,
    }
  case DELETE_BOOK_REQUEST:
    return {
      ...state,
      isLoading: true,
      error: '',
    }
  case DELETE_BOOK_SUCCESS:
    return {
      ...state,
      successCode: action.payload,
      isLoading: false,
      isBooksLoaded: false,
      error: '',
    }
  case DELETE_BOOK_FAILURE:
    return {
      ...state,
      error: action.payload.msg,
      isLoading: false,
    }
  case RESET_BOOKS_FORM_SNACKBAR:
    return {
      ...state,
      error: '',
      isBookAdded: false,
      isBookUpdated: false,
    }
  case UPDATE_BOOK_REQUEST:
    return {
      ...state,
      isBookUpdated: false,
      isLoading: true,
      error: '',
    }
  case UPDATE_BOOK_SUCCESS:
    return {
      ...state,
      book: action.payload,
      isLoading: false,
      isBookUpdated: true,
      isBooksLoaded: false,
      error: '',
    }
  case UPDATE_BOOK_FAILURE:
    return {
      ...state,
      error: action.payload.msg,
      isLoading: false,
    }
  default:
    return state
  }
}
