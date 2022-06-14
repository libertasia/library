import {
  SetAuthorsFilterValueAction,
  SetCategoryFiltersAction,
  SetPageAction,
  SetRowsPerPageAction,
  SetSearchTypeAction,
  SetSearchValueAction,
  SetStatusFiltersAction,
  RedirectToUrlAction,
  SET_AUTHORS_FILTER_VALUE,
  SET_CATEGORY_FILTERS,
  SET_PAGE,
  SET_ROWS_PER_PAGE,
  SET_SEARCH_TYPE,
  SET_SEARCH_VALUE,
  SET_STATUS_FILTERS,
  REDIRECT_TO_URL,
} from '../../types'

export function redirectToUrl(url: string): RedirectToUrlAction {
  return {
    type: REDIRECT_TO_URL,
    payload: url,
  }
}

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

export function setPage(page: number): SetPageAction {
  return {
    type: SET_PAGE,
    payload: {
      page,
    },
  }
}

export function setRowsPerPage(rowsPerPage: number): SetRowsPerPageAction {
  return {
    type: SET_ROWS_PER_PAGE,
    payload: {
      rowsPerPage,
    },
  }
}

export function setAuthorsFilterValue(
  authorsFilterValue: string
): SetAuthorsFilterValueAction {
  return {
    type: SET_AUTHORS_FILTER_VALUE,
    payload: {
      authorsFilterValue,
    },
  }
}
