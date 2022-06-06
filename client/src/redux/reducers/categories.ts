import {
  CategoriesState,
  CategoriesActions,
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
} from '../../types'

const initialState: CategoriesState = {
  categories: [],
  isCategoriesLoaded: false,
  isLoading: false,
  error: '',
}

export function categoriesReducer(
  state = initialState,
  action: CategoriesActions
) {
  switch (action.type) {
  case LOAD_CATEGORIES_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case LOAD_CATEGORIES_SUCCESS:
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
      isCategoriesLoaded: true,
    }
  case LOAD_CATEGORIES_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    }
  default:
    return state
  }
}
