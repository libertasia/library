import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'

import rootReducer from '../redux/reducers'
import { redirect } from './middlewares/redirect'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk), applyMiddleware(redirect))
)

export default store
