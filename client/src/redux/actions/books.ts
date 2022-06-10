import axios from 'axios'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

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

export function resetBooksError(): ResetBooksFormSnackbarAction {
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
        `http://localhost:5000/api/v1/books/search?page=${page}&perPage=${perPage}&${searchType}=${searchValue}&status=${statusQuery}&category=${categoryQuery}`
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
      const res = await axios.get('http://localhost:5000/api/v1/books/count')
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
        `http://localhost:5000/api/v1/books/create`,
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
      const res = await axios.delete(
        `http://localhost:5000/api/v1/books/${_id}/delete`,
        { withCredentials: true }
      )
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
