import { combineReducers } from 'redux'

import { authorsReducer } from './authors'
import { booksReducer } from './books'
import { categoriesReducer } from './categories'
import { uiReducer } from './ui'
import { userReducer } from './user'

export default combineReducers({
  user: userReducer,
  booksData: booksReducer,
  authors: authorsReducer,
  categories: categoriesReducer,
  ui: uiReducer,
})
