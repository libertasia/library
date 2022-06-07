// Action types
export const LOAD_BOOKS_REQUEST = 'LOAD_BOOKS_REQUEST'
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS'
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE'

export const LOAD_BOOKS_COUNT_REQUEST = 'LOAD_BOOKS_COUNT_REQUEST'
export const LOAD_BOOKS_COUNT_SUCCESS = 'LOAD_BOOKS_COUNT_SUCCESS'
export const LOAD_BOOKS_COUNT_FAILURE = 'LOAD_BOOKS_COUNT_FAILURE'

export const LOAD_FILTERED_BOOKS_REQUEST = 'LOAD_FILTERED_BOOKS_REQUEST'
export const LOAD_FILTERED_BOOKS_SUCCESS = 'LOAD_FILTERED_BOOKS_SUCCES'
export const LOAD_FILTERED_BOOKS_FAILURE = 'LOAD_FILTERED_BOOKS_FAILURE'

export const LOAD_BOOK_BY_ID_REQUEST = 'LOAD_BOOK_BY_ID_REQUEST'
export const LOAD_BOOK_BY_ID_SUCCESS = 'LOAD_BOOK_BY_ID_SUCCESS'
export const LOAD_BOOK_BY_ID_FAILURE = 'LOAD_BOOK_BY_ID_FAILURE'

export const LOAD_CATEGORIES_REQUEST = 'LOAD_CATEGORIES_REQUEST'
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS'
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE'

export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE'
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const SET_STATUS_FILTERS = 'SET_STATUS_FILTERS'
export const SET_CATEGORY_FILTERS = 'SET_CATEGORY_FILTERS'

// Categories

export type CategoryType = {
  _id: string
  title: string
}
export type CategoriesPropType = {
  categories: CategoryType[]
}

// Books

export type StatusType = 'AVAILABLE' | 'BORROWED'

export type BookType = {
  _id: string
  isbn: string
  title: string
  category: string
  description: string
  publisher: string
  authors: string[]
  publishedYear: number
  numPage: number
  status: StatusType
  borrowerId?: string
  borrowDate?: Date
  returnDate?: Date
}

export type BookPropType = {
  book: BookType
}

export type BooksPropType = {
  books: BookType[]
}

// Actions

export type BooksActions =
  | LoadBooksRequestAction
  | LoadBooksSuccessAction
  | LoadBooksFailureAction
  | LoadBooksCountRequestAction
  | LoadBooksCountSuccessAction
  | LoadBooksCountFailureAction

export type CategoriesActions =
  | LoadCategoriesRequestAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesFailureAction

export type UiActions =
  | SetSearchTypeAction
  | SetSearchValueAction
  | SetStatusFiltersAction
  | SetCategoryFiltersAction

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

export type LoadBooksRequestAction = {
  type: typeof LOAD_BOOKS_REQUEST
}

export type LoadBooksSuccessAction = {
  type: typeof LOAD_BOOKS_SUCCESS
  payload: BooksPropType
}

export type LoadBooksFailureAction = {
  type: typeof LOAD_BOOKS_FAILURE
  payload: {
    msg: string
  }
}

export type LoadBooksCountRequestAction = {
  type: typeof LOAD_BOOKS_COUNT_REQUEST
}

export type LoadBooksCountSuccessAction = {
  type: typeof LOAD_BOOKS_COUNT_SUCCESS
  payload: number
}

export type LoadBooksCountFailureAction = {
  type: typeof LOAD_BOOKS_COUNT_FAILURE
  payload: {
    msg: string
  }
}

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

// State
export type BooksState = {
  books: BookType[]
  book: BookType[]
  booksCount: number
  isBooksLoaded: boolean
  isBooksCountLoaded: boolean
  isBookLoaded: boolean
  isLoading: boolean
  error: string
}

export type CategoriesState = {
  categories: CategoryType[]
  isCategoriesLoaded: boolean
  isLoading: boolean
  error: string
}

export type UiState = {
  searchType: string
  searchValue: string
  statusFilters: string[]
  categoryFilters: string[]
}

export type AppState = {
  booksData: BooksState
  categories: CategoriesState
  ui: UiState
}
