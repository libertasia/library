import { combineReducers } from 'redux'

import { booksReducer } from './books'
import { categoriesReducer } from './categories'
import { uiReducer } from './ui'

export default combineReducers({
  booksData: booksReducer,
  categories: categoriesReducer,
  ui: uiReducer,
})
