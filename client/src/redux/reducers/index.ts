import { combineReducers } from 'redux'

import { authorsReducer } from './authors'
import { booksReducer } from './books'
import { categoriesReducer } from './categories'
import { uiReducer } from './ui'

export default combineReducers({
  booksData: booksReducer,
  authors: authorsReducer,
  categories: categoriesReducer,
  ui: uiReducer,
})
