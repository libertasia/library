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
} from '../../types'

const initialState: BooksState = {
  books: [],
  book: [],
  booksCount: 0,
  isBooksLoaded: false,
  isBooksCountLoaded: false,
  isBookLoaded: false,
  isLoading: false,
  error: '',
}

export function booksReducer(state = initialState, action: BooksActions) {
  switch (action.type) {
  case RESET_BOOKS_LOADED_STATUS:
    return {
      ...state,
      isBooksLoaded: false,
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
  default:
    return state
  }
}
