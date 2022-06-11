// Action types

export const LOAD_CATEGORIES_REQUEST = 'LOAD_CATEGORIES_REQUEST'
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE'

// Categories

export type CategoryType = {
  _id: string
  title: string
}
export type CategoriesPropType = {
  categories: CategoryType[]
}

// Actions

export type CategoriesActions =
  | LoadCategoriesRequestAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesFailureAction

export type LoadCategoriesRequestAction = {
  type: typeof LOAD_CATEGORIES_REQUEST
}

export type LoadCategoriesSuccessAction = {
  type: typeof LOAD_CATEGORIES_SUCCESS
  payload: CategoriesPropType
}

export type LoadCategoriesFailureAction = {
  type: typeof LOAD_CATEGORIES_FAILURE
  payload: {
    msg: string
  }
}

// State

export type CategoriesState = {
  categories: CategoryType[]
  isCategoriesLoaded: boolean
  isLoading: boolean
  error: string
}
