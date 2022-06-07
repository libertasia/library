import {
  SetCategoryFiltersAction,
  SetSearchTypeAction,
  SetSearchValueAction,
  SetStatusFiltersAction,
  SET_CATEGORY_FILTERS,
  SET_SEARCH_TYPE,
  SET_SEARCH_VALUE,
  SET_STATUS_FILTERS,
} from '../../types'

export function setSearchType(searchType: string): SetSearchTypeAction {
  return {
    type: SET_SEARCH_TYPE,
    payload: {
      searchType,
    },
  }
}

export function setSearchValue(searchValue: string): SetSearchValueAction {
  return {
    type: SET_SEARCH_VALUE,
    payload: {
      searchValue,
    },
  }
}

export function setStatusFilters(
  statusFilters: string[]
): SetStatusFiltersAction {
  return {
    type: SET_STATUS_FILTERS,
    payload: {
      statusFilters,
    },
  }
}

export function setCategoryFilters(
  categoryFilters: string[]
): SetCategoryFiltersAction {
  return {
    type: SET_CATEGORY_FILTERS,
    payload: {
      categoryFilters,
    },
  }
}
