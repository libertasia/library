import { CategoryType } from './categories'
import { AuthorType } from './authors'

// Action types

export const LOAD_BOOKS_REQUEST = 'LOAD_BOOKS_REQUEST'
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS'
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE'

export const LOAD_BOOKS_COUNT_REQUEST = 'LOAD_BOOKS_COUNT_REQUEST'
export const LOAD_BOOKS_COUNT_SUCCESS = 'LOAD_BOOKS_COUNT_SUCCESS'
export const LOAD_BOOKS_COUNT_FAILURE = 'LOAD_BOOKS_COUNT_FAILURE'

export const LOAD_BOOK_BY_ID_REQUEST = 'LOAD_BOOK_BY_ID_REQUEST'
export const LOAD_BOOK_BY_ID_SUCCESS = 'LOAD_BOOK_BY_ID_SUCCESS'
export const LOAD_BOOK_BY_ID_FAILURE = 'LOAD_BOOK_BY_ID_FAILURE'

export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST'
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS'
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE'

export const DELETE_BOOK_REQUEST = 'DELETE_BOOK_REQUEST'
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS'
export const DELETE_BOOK_FAILURE = 'DELETE_BOOK_FAILURE'

export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST'
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS'
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE'

export const BORROW_BOOK_REQUEST = 'BORROW_BOOK_REQUEST'
export const BORROW_BOOK_SUCCESS = 'BORROW_BOOK_SUCCESS'
export const BORROW_BOOK_FAILURE = 'BORROW_BOOK_FAILURE'

export const RETURN_BOOK_REQUEST = 'RETURN_BOOK_REQUEST'
export const RETURN_BOOK_SUCCESS = 'RETURN_BOOK_SUCCESS'
export const RETURN_BOOK_FAILURE = 'RETURN_BOOK_FAILURE'

export const RESET_BOOKS_LOADED_STATUS = 'RESET_BOOKS_LOADED_STATUS'

export const RESET_BOOKS_FORM_SNACKBAR = 'RESET_BOOKS_FORM_SNACKBAR'

// Books

export type StatusType = 'AVAILABLE' | 'BORROWED'

export type BookType = {
  _id: string
  isbn: string
  title: string
  category: CategoryType
  description: string
  publisher: string
  authors: AuthorType[]
  publishedYear: number
  numPage: number
  status: StatusType
  borrowerId?: string
  borrowDate?: Date
  returnDate?: Date
}

export type BookPropType = {
  book: BookType
}

export type BooksPropType = {
  books: BookType[]
}

// Actions

export type BooksActions =
  | LoadBooksRequestAction
  | LoadBooksSuccessAction
  | LoadBooksFailureAction
  | LoadBooksCountRequestAction
  | LoadBooksCountSuccessAction
  | LoadBooksCountFailureAction
  | ResetBooksLoadedStatusAction
  | AddBookRequestAction
  | AddBookSuccessAction
  | AddBookFailureAction
  | ResetBooksFormSnackbarAction
  | DeleteBookRequestAction
  | DeleteBookSuccessAction
  | DeleteBookFailureAction
  | LoadBookByIdRequestAction
  | LoadBookByIdSuccessAction
  | LoadBookByIdFailureAction
  | UpdateBookRequestAction
  | UpdateBookSuccessAction
  | UpdateBookFailureAction
  | BorrowBookRequestAction
  | BorrowBookSuccessAction
  | BorrowBookFailureAction
  | ReturnBookRequestAction
  | ReturnBookSuccessAction
  | ReturnBookFailureAction

export type LoadBooksRequestAction = {
  type: typeof LOAD_BOOKS_REQUEST
}

export type LoadBooksSuccessAction = {
  type: typeof LOAD_BOOKS_SUCCESS
  payload: BooksPropType
}

export type LoadBooksFailureAction = {
  type: typeof LOAD_BOOKS_FAILURE
  payload: {
    msg: string
  }
}

export type LoadBooksCountRequestAction = {
  type: typeof LOAD_BOOKS_COUNT_REQUEST
}

export type LoadBooksCountSuccessAction = {
  type: typeof LOAD_BOOKS_COUNT_SUCCESS
  payload: number
}

export type LoadBooksCountFailureAction = {
  type: typeof LOAD_BOOKS_COUNT_FAILURE
  payload: {
    msg: string
  }
}

export type LoadBookByIdRequestAction = {
  type: typeof LOAD_BOOK_BY_ID_REQUEST
}

export type LoadBookByIdSuccessAction = {
  type: typeof LOAD_BOOK_BY_ID_SUCCESS
  payload: BooksPropType
}

export type LoadBookByIdFailureAction = {
  type: typeof LOAD_BOOK_BY_ID_FAILURE
  payload: {
    msg: string
  }
}

export type AddBookRequestAction = {
  type: typeof ADD_BOOK_REQUEST
}

export type AddBookSuccessAction = {
  type: typeof ADD_BOOK_SUCCESS
  payload: BookPropType
}

export type AddBookFailureAction = {
  type: typeof ADD_BOOK_FAILURE
  payload: {
    msg: string
  }
}

export type DeleteBookRequestAction = {
  type: typeof DELETE_BOOK_REQUEST
}

export type DeleteBookSuccessAction = {
  type: typeof DELETE_BOOK_SUCCESS
  payload: number
}

export type DeleteBookFailureAction = {
  type: typeof DELETE_BOOK_FAILURE
  payload: {
    msg: string
  }
}

export type UpdateBookRequestAction = {
  type: typeof UPDATE_BOOK_REQUEST
}

export type UpdateBookSuccessAction = {
  type: typeof UPDATE_BOOK_SUCCESS
  payload: BookPropType
}

export type UpdateBookFailureAction = {
  type: typeof UPDATE_BOOK_FAILURE
  payload: {
    msg: string
  }
}

export type BorrowBookRequestAction = {
  type: typeof BORROW_BOOK_REQUEST
}

export type BorrowBookSuccessAction = {
  type: typeof BORROW_BOOK_SUCCESS
  payload: BooksPropType
}

export type BorrowBookFailureAction = {
  type: typeof BORROW_BOOK_FAILURE
  payload: {
    msg: string
  }
}

export type ReturnBookRequestAction = {
  type: typeof RETURN_BOOK_REQUEST
}

export type ReturnBookSuccessAction = {
  type: typeof RETURN_BOOK_SUCCESS
  payload: BooksPropType
}

export type ReturnBookFailureAction = {
  type: typeof RETURN_BOOK_FAILURE
  payload: {
    msg: string
  }
}

export type ResetBooksLoadedStatusAction = {
  type: typeof RESET_BOOKS_LOADED_STATUS
}

export type ResetBooksFormSnackbarAction = {
  type: typeof RESET_BOOKS_FORM_SNACKBAR
}

// State

export type BooksState = {
  books: BookType[]
  book: BookType[]
  booksCount: number
  isBooksLoaded: boolean
  isBooksCountLoaded: boolean
  isBookLoaded: boolean
  isBookAdded: boolean
  isBookUpdated: boolean
  isBookBorrowed: boolean
  isBookReturned: boolean
  isLoading: boolean
  error: string
  successCode: number
}
