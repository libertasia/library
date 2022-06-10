import axios from 'axios'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import {
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  LoadCategoriesRequestAction,
  LoadCategoriesSuccessAction,
  LoadCategoriesFailureAction,
  CategoriesState,
  CategoriesPropType,
} from '../../types'

export function loadCategoriesRequest(): LoadCategoriesRequestAction {
  return {
    type: LOAD_CATEGORIES_REQUEST,
  }
}

export function loadCategoriesSuccess(
  payload: CategoriesPropType
): LoadCategoriesSuccessAction {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload,
  }
}

export function loadCategoriesFailure(
  msg: string
): LoadCategoriesFailureAction {
  return {
    type: LOAD_CATEGORIES_FAILURE,
    payload: {
      msg,
    },
  }
}

// ----------------------------------------------------------------------

export function getCategories() {
  return async function (
    dispatch: ThunkDispatch<CategoriesState, void, Action>
  ) {
    dispatch(loadCategoriesRequest())
    try {
      const res = await axios.get('http://localhost:5000/api/v1/categories')
      const categories = res.data
      dispatch(loadCategoriesSuccess(categories))
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(loadCategoriesFailure('Resourse is not found'))
        return
      }
      dispatch(loadCategoriesFailure('Something went wrong'))
    }
  }
}
