import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension'
import rootReducer from '../redux/reducers'

const store = createStore(
  rootReducer,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk))
)

export default store
