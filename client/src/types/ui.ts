// Action types

export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE'
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const SET_STATUS_FILTERS = 'SET_STATUS_FILTERS'
export const SET_CATEGORY_FILTERS = 'SET_CATEGORY_FILTERS'
export const SET_AUTHORS_FILTER_VALUE = 'SET_AUTHORS_FILTER_VALUE'

export const SET_PAGE = 'SET_PAGE'
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE'

export const REDIRECT_TO_URL = 'REDIRECT_TO_URL'

// Actions

export type UiActions =
  | SetSearchTypeAction
  | SetSearchValueAction
  | SetStatusFiltersAction
  | SetCategoryFiltersAction
  | SetPageAction
  | SetRowsPerPageAction
  | SetAuthorsFilterValueAction
  | RedirectToUrlAction

export type SetSearchTypeAction = {
  type: typeof SET_SEARCH_TYPE
  payload: {
    searchType: string
  }
}

export type SetSearchValueAction = {
  type: typeof SET_SEARCH_VALUE
  payload: {
    searchValue: string
  }
}

export type SetStatusFiltersAction = {
  type: typeof SET_STATUS_FILTERS
  payload: {
    statusFilters: string[]
  }
}

export type SetCategoryFiltersAction = {
  type: typeof SET_CATEGORY_FILTERS
  payload: {
    categoryFilters: string[]
  }
}

export type SetPageAction = {
  type: typeof SET_PAGE
  payload: {
    page: number
  }
}

export type SetRowsPerPageAction = {
  type: typeof SET_ROWS_PER_PAGE
  payload: {
    rowsPerPage: number
  }
}

export type SetAuthorsFilterValueAction = {
  type: typeof SET_AUTHORS_FILTER_VALUE
  payload: {
    authorsFilterValue: string
  }
}

export type RedirectToUrlAction = {
  type: typeof REDIRECT_TO_URL
  payload: string
}

// State

export type UiState = {
  searchType: string
  searchValue: string
  statusFilters: string[]
  categoryFilters: string[]
  page: number
  rowsPerPage: number
  authorsFilterValue: string
}
