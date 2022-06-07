import {
  SET_CATEGORY_FILTERS,
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
  default:
    return state
  }
}
