import {
  SET_CATEGORY_FILTERS,
  SET_PAGE,
  SET_ROWS_PER_PAGE,
  SET_SEARCH_TYPE,
  SET_SEARCH_VALUE,
  SET_STATUS_FILTERS,
  UiActions,
  UiState,
} from '../../types'

const initialState: UiState = {
  searchType: 'title',
  searchValue: '',
  statusFilters: [],
  categoryFilters: [],
  page: 0,
  rowsPerPage: 10,
}

export function uiReducer(state = initialState, action: UiActions) {
  switch (action.type) {
  case SET_SEARCH_TYPE:
    return {
      ...state,
      searchType: action.payload.searchType,
    }
  case SET_SEARCH_VALUE:
    return {
      ...state,
      searchValue: action.payload.searchValue,
    }
  case SET_STATUS_FILTERS:
    return {
      ...state,
      statusFilters: action.payload.statusFilters,
    }
  case SET_CATEGORY_FILTERS:
    return {
      ...state,
      categoryFilters: action.payload.categoryFilters,
    }
  case SET_PAGE:
    return {
      ...state,
      page: action.payload.page,
    }
  case SET_ROWS_PER_PAGE:
    return {
      ...state,
      rowsPerPage: action.payload.rowsPerPage,
    }
  default:
    return state
  }
}
