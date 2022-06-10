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

export const LOAD_AUTHORS_REQUEST = 'LOAD_AUTHORS_REQUEST'
export const LOAD_AUTHORS_SUCCESS = 'LOAD_AUTHORS_SUCCESS'
export const LOAD_AUTHORS_FAILURE = 'LOAD_AUTHORS_FAILURE'

export const ADD_AUTHOR_REQUEST = 'ADD_AUTHOR_REQUEST'
export const ADD_AUTHOR_SUCCESS = 'ADD_AUTHOR_SUCCESS'
export const ADD_AUTHOR_FAILURE = 'ADD_AUTHOR_FAILURE'

export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE'
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
export const SET_STATUS_FILTERS = 'SET_STATUS_FILTERS'
export const SET_CATEGORY_FILTERS = 'SET_CATEGORY_FILTERS'
export const SET_AUTHORS_FILTER_VALUE = 'SET_AUTHORS_FILTER_VALUE'

export const SET_PAGE = 'SET_PAGE'
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE'
export const RESET_BOOKS_LOADED_STATUS = 'RESET_BOOKS_LOADED_STATUS'

export const RESET_AUTHORS_FORM_SNACKBAR = 'RESET_AUTHORS_FORM_SNACKBAR'

// Categories

export type CategoryType = {
  _id: string
  title: string
}
export type CategoriesPropType = {
  categories: CategoryType[]
}

// Authors

export type AuthorType = {
  _id: string
  firstName: string
  lastName: string
  birthYear?: number
  biography?: string
  books?: BookType[]
}

export type AuthorPropType = {
  author: AuthorType
}

export type AuthorsPropType = {
  authors: AuthorType[]
}

// Books

export type StatusType = 'AVAILABLE' | 'BORROWED'

export type BookType = {
  _id: string
  isbn: string
  title: string
  category: CategoryType
  description: string
  publisher: string
  authors: AuthorType[]
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
  | ResetBooksLoadedStatusAction

export type CategoriesActions =
  | LoadCategoriesRequestAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesFailureAction

export type AuthorsActions =
  | LoadAuthorsRequestAction
  | LoadAuthorsSuccessAction
  | LoadAuthorsFailureAction
  | AddAuthorRequestAction
  | AddAuthorSuccessAction
  | AddAuthorFailureAction
  | ResetAuthorsFormSnackbarAction

export type UiActions =
  | SetSearchTypeAction
  | SetSearchValueAction
  | SetStatusFiltersAction
  | SetCategoryFiltersAction
  | SetPageAction
  | SetRowsPerPageAction
  | SetAuthorsFilterValueAction

export type ResetBooksLoadedStatusAction = {
  type: typeof RESET_BOOKS_LOADED_STATUS
}

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

export type LoadAuthorsRequestAction = {
  type: typeof LOAD_AUTHORS_REQUEST
}

export type LoadAuthorsSuccessAction = {
  type: typeof LOAD_AUTHORS_SUCCESS
  payload: AuthorsPropType
}

export type LoadAuthorsFailureAction = {
  type: typeof LOAD_AUTHORS_FAILURE
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

export type AddAuthorRequestAction = {
  type: typeof ADD_AUTHOR_REQUEST
}

export type AddAuthorSuccessAction = {
  type: typeof ADD_AUTHOR_SUCCESS
  payload: AuthorPropType
}

export type AddAuthorFailureAction = {
  type: typeof ADD_AUTHOR_FAILURE
  payload: {
    msg: string
  }
}

export type ResetAuthorsFormSnackbarAction = {
  type: typeof RESET_AUTHORS_FORM_SNACKBAR
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

export type AuthorsState = {
  authors: AuthorType[]
  author: AuthorType[]
  isAuthorsLoaded: boolean
  isAuthorAdded: boolean
  isLoading: boolean
  error: string
}

export type UiState = {
  searchType: string
  searchValue: string
  statusFilters: string[]
  categoryFilters: string[]
  page: number
  rowsPerPage: number
  authorsFilterValue: string
}

export type AppState = {
  booksData: BooksState
  categories: CategoriesState
  authors: AuthorsState
  ui: UiState
}
