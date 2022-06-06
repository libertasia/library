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
  //BookType,
} from '../../types'

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

export function getBooksPaginated(page?: number, perPage?: number) {
  return async function (dispatch: ThunkDispatch<BooksState, void, Action>) {
    dispatch(loadBooksRequest())
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/books?page=${page}&perPage=${perPage}`
      )
      const booksData = res.data
      dispatch(loadBooksSuccess(booksData))
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
      const booksCount = res.data
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

// export function getCountryByName(name: any) {
//   return async function (
//     dispatch: ThunkDispatch<CountriesState, void, Action>
//   ) {
//     dispatch(loadBooksCountRequest())
//     try {
//       const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
//       const countriesData = res.data.map((obj: any) => ({
//         ...obj,
//         isInFavourites: false,
//         id: obj.name.common,
//       }))
//       dispatch(loadBooksCountSuccess(countriesData))
//     } catch (error: any) {
//       if (error.response.status === 404) {
//         dispatch(loadBooksCountFailure('Resourse is not found'))
//         return
//       }
//       dispatch(loadBooksCountFailure('Something went wrong'))
//     }
//   }
// }
