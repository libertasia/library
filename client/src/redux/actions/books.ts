import axios from 'axios'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { API_URL } from '../../config'

import {
  LOAD_BOOKS_REQUEST,
  LOAD_BOOKS_SUCCESS,
  LOAD_BOOKS_FAILURE,
  LOAD_BOOKS_COUNT_SUCCESS,
  LOAD_BOOKS_COUNT_REQUEST,
  LOAD_BOOKS_COUNT_FAILURE,
  LoadBooksRequestAction,
  LoadBooksSuccessAction,
  LoadBooksFailureAction,
  LoadBooksCountRequestAction,
  LoadBooksCountSuccessAction,
  LoadBooksCountFailureAction,
  BooksState,
  BooksPropType,
  ResetBooksLoadedStatusAction,
  RESET_BOOKS_LOADED_STATUS,
  AddBookRequestAction,
  ADD_BOOK_REQUEST,
  BookPropType,
  AddBookSuccessAction,
  ADD_BOOK_SUCCESS,
  AddBookFailureAction,
  ADD_BOOK_FAILURE,
  ResetBooksFormSnackbarAction,
  RESET_BOOKS_FORM_SNACKBAR,
  DeleteBookRequestAction,
  DELETE_BOOK_REQUEST,
  DeleteBookSuccessAction,
  DELETE_BOOK_SUCCESS,
  DeleteBookFailureAction,
  DELETE_BOOK_FAILURE,
  LoadBookByIdRequestAction,
  LOAD_BOOK_BY_ID_REQUEST,
  LoadBookByIdSuccessAction,
  LOAD_BOOK_BY_ID_SUCCESS,
  LoadBookByIdFailureAction,
  LOAD_BOOK_BY_ID_FAILURE,
  UpdateBookRequestAction,
  UPDATE_BOOK_REQUEST,
  UpdateBookSuccessAction,
  UPDATE_BOOK_SUCCESS,
  UpdateBookFailureAction,
  UPDATE_BOOK_FAILURE,
  BorrowBookRequestAction,
  BORROW_BOOK_REQUEST,
  BorrowBookSuccessAction,
  BORROW_BOOK_SUCCESS,
  BorrowBookFailureAction,
  BORROW_BOOK_FAILURE,
  ReturnBookRequestAction,
  RETURN_BOOK_REQUEST,
  ReturnBookSuccessAction,
  RETURN_BOOK_SUCCESS,
  ReturnBookFailureAction,
  RETURN_BOOK_FAILURE,
  ResetBookStatusAction,
  RESET_BOOK_STATUS,
} from '../../types'

export function resetBooksLoadedStatus(): ResetBooksLoadedStatusAction {
  return {
    type: RESET_BOOKS_LOADED_STATUS,
  }
}

export function loadBooksRequest(): LoadBooksRequestAction {
  return {
    type: LOAD_BOOKS_REQUEST,
  }
}

export function loadBooksSuccess(
  payload: BooksPropType
): LoadBooksSuccessAction {
  return {
    type: LOAD_BOOKS_SUCCESS,
    payload,
  }
}

export function loadBooksFailure(msg: string): LoadBooksFailureAction {
  return {
    type: LOAD_BOOKS_FAILURE,
    payload: {
      msg,
    },
  }
}

export function loadBooksCountRequest(): LoadBooksCountRequestAction {
  return {
    type: LOAD_BOOKS_COUNT_REQUEST,
  }
}

export function loadBooksCountSuccess(
  payload: number
): LoadBooksCountSuccessAction {
  return {
    type: LOAD_BOOKS_COUNT_SUCCESS,
    payload,
  }
}

export function loadBooksCountFailure(
  msg: string
): LoadBooksCountFailureAction {
  return {
    type: LOAD_BOOKS_COUNT_FAILURE,
    payload: {
      msg,
    },
  }
}

export function loadBookByIdRequest(): LoadBookByIdRequestAction {
  return {
    type: LOAD_BOOK_BY_ID_REQUEST,
  }
}

export function loadBookByIdSuccess(
  payload: BooksPropType
): LoadBookByIdSuccessAction {
  return {
    type: LOAD_BOOK_BY_ID_SUCCESS,
    payload,
  }
}

export function loadBookByIdFailure(msg: string): LoadBookByIdFailureAction {
  return {
    type: LOAD_BOOK_BY_ID_FAILURE,
    payload: {
      msg,
    },
  }
}

export function addBookRequest(): AddBookRequestAction {
  return {
    type: ADD_BOOK_REQUEST,
  }
}

export function addBookSuccess(payload: BookPropType): AddBookSuccessAction {
  return {
    type: ADD_BOOK_SUCCESS,
    payload,
  }
}

export function addBookFailure(msg: string): AddBookFailureAction {
  return {
    type: ADD_BOOK_FAILURE,
    payload: {
      msg,
    },
  }
}

export function resetBooksFormSnackbar(): ResetBooksFormSnackbarAction {
  return {
    type: RESET_BOOKS_FORM_SNACKBAR,
  }
}

export function deleteBookRequest(): DeleteBookRequestAction {
  return {
    type: DELETE_BOOK_REQUEST,
  }
}

export function deleteBookSuccess(status: number): DeleteBookSuccessAction {
  return {
    type: DELETE_BOOK_SUCCESS,
    payload: status,
  }
}

export function deleteBookFailure(msg: string): DeleteBookFailureAction {
  return {
    type: DELETE_BOOK_FAILURE,
    payload: {
      msg,
    },
  }
}

export function updateBookRequest(): UpdateBookRequestAction {
  return {
    type: UPDATE_BOOK_REQUEST,
  }
}

export function updateBookSuccess(
  payload: BookPropType
): UpdateBookSuccessAction {
  return {
    type: UPDATE_BOOK_SUCCESS,
    payload,
  }
}

export function updateBookFailure(msg: string): UpdateBookFailureAction {
  return {
    type: UPDATE_BOOK_FAILURE,
    payload: {
      msg,
    },
  }
}

export function borrowBookRequest(): BorrowBookRequestAction {
  return {
    type: BORROW_BOOK_REQUEST,
  }
}

export function borrowBookSuccess(
  payload: BooksPropType
): BorrowBookSuccessAction {
  return {
    type: BORROW_BOOK_SUCCESS,
    payload,
  }
}

export function borrowBookFailure(msg: string): BorrowBookFailureAction {
  return {
    type: BORROW_BOOK_FAILURE,
    payload: {
      msg,
    },
  }
}

export function returnBookRequest(): ReturnBookRequestAction {
  return {
    type: RETURN_BOOK_REQUEST,
  }
}

export function returnBookSuccess(
  payload: BooksPropType
): ReturnBookSuccessAction {
  return {
    type: RETURN_BOOK_SUCCESS,
    payload,
  }
}

export function returnBookFailure(msg: string): ReturnBookFailureAction {
  return {
    type: RETURN_BOOK_FAILURE,
    payload: {
      msg,
    },
  }
}

export function resetBookStatus(): ResetBookStatusAction {
  return {
    type: RESET_BOOK_STATUS,
  }
}

// ----------------------------------------------------------------------

export function getBooksPaginated(
  page?: number,
  perPage?: number,
  searchType?: string,
  searchValue?: string,
  statusFilters?: string[],
  categoryFilters?: string[]
) {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(loadBooksRequest())
    try {
      const statusQuery = statusFilters?.join()
      const categoryQuery = categoryFilters?.join()
      const res = await axios.get(
        `${API_URL}/api/v1/books/search?page=${page}&perPage=${perPage}&${searchType}=${searchValue}&status=${statusQuery}&category=${categoryQuery}`
      )
      const responseData = res.data
      dispatch(loadBooksSuccess(responseData.books))
      dispatch(loadBooksCountSuccess(responseData.totalCount))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(loadBooksFailure('Resourse is not found'))
        return
      }
      dispatch(loadBooksFailure('Something went wrong'))
    }
  }
}

export function getBooksCount() {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(loadBooksCountRequest())
    try {
      const res = await axios.get(`${API_URL}/api/v1/books/count`)
      const booksCount: number = res.data
      dispatch(loadBooksCountSuccess(booksCount))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(loadBooksCountFailure('Resourse is not found'))
        return
      }
      dispatch(loadBooksCountFailure('Something went wrong'))
    }
  }
}

export function getBookById(_id: string) {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(loadBookByIdRequest())
    try {
      const res = await axios.get(`${API_URL}/api/v1/books/${_id}`)
      const responseData = res.data
      dispatch(loadBookByIdSuccess(responseData.books))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(loadBookByIdFailure('Resourse is not found'))
        return
      }
      dispatch(loadBookByIdFailure('Something went wrong'))
    }
  }
}

export function addNewBook(
  isbn: string,
  title: string,
  categoryId: string,
  description: string,
  publisher: string,
  authorsIds: string[],
  publishedYear: string,
  numPage: string
) {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(addBookRequest())
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/books/create`,
        {
          isbn,
          title,
          categoryId,
          description,
          publisher,
          authorsIds,
          publishedYear,
          numPage,
        },
        { withCredentials: true }
      )
      dispatch(addBookSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(addBookFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          addBookFailure('You are not authorized to perform this action')
        )
        return
      }
      dispatch(addBookFailure(`Something went wrong: ${error}`))
    }
  }
}

export function deleteBook(_id: string) {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(deleteBookRequest())
    try {
      const res = await axios.delete(`${API_URL}/api/v1/books/${_id}/delete`, {
        withCredentials: true,
      })
      dispatch(deleteBookSuccess(res.status))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(deleteBookFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          deleteBookFailure('You are not authorized to perform this action')
        )
        return
      }
      if (error.response.status === 417) {
        dispatch(deleteBookFailure('Can not delete borrowed book'))
        return
      }
      dispatch(deleteBookFailure(`Something went wrong: ${error}`))
    }
  }
}

export function updateBook(
  _id: string,
  isbn: string,
  title: string,
  categoryId: string,
  description: string,
  publisher: string,
  authorsIds: string[],
  publishedYear: number,
  numPage: number
) {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(updateBookRequest())
    try {
      const res = await axios.put(
        `${API_URL}/api/v1/books/${_id}/update`,
        {
          isbn,
          title,
          categoryId,
          description,
          publisher,
          authorsIds,
          publishedYear,
          numPage,
        },
        { withCredentials: true }
      )
      dispatch(updateBookSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(updateBookFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          updateBookFailure('You are not authorized to perform this action')
        )
        return
      }
      dispatch(updateBookFailure(`Something went wrong: ${error}`))
    }
  }
}

export function borrowBook(bookId: string, userId: string) {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(borrowBookRequest())
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/books/${bookId}/borrow`,
        {
          userId,
        },
        { withCredentials: true }
      )
      dispatch(borrowBookSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(borrowBookFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          borrowBookFailure('You are not authorized to perform this action')
        )
        return
      }
      dispatch(borrowBookFailure(`Something went wrong: ${error}`))
    }
  }
}

export function returnBook(bookId: string, userId: string) {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(returnBookRequest())
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/books/${bookId}/return`,
        {
          userId,
        },
        { withCredentials: true }
      )
      dispatch(returnBookSuccess(res.data))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(returnBookFailure('Resourse is not found'))
        return
      }
      if (error.response.status === 403) {
        dispatch(
          returnBookFailure('You are not authorized to perform this action')
        )
        return
      }
      dispatch(returnBookFailure(`Something went wrong: ${error}`))
    }
  }
}
