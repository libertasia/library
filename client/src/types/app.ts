import { BooksState } from './books'
import { CategoriesState } from './categories'
import { AuthorsState } from './authors'
import { UiState } from './ui'
import { UserState } from './user'

export type AppState = {
  user: UserState
  booksData: BooksState
  categories: CategoriesState
  authors: AuthorsState
  ui: UiState
}
