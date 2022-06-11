import { BooksState } from './books'
import { CategoriesState } from './categories'
import { AuthorsState } from './authors'
import { UiState } from './ui'

export type AppState = {
  booksData: BooksState
  categories: CategoriesState
  authors: AuthorsState
  ui: UiState
}
