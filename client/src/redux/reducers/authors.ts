import {
  AuthorsState,
  AuthorsActions,
  LOAD_AUTHORS_REQUEST,
  LOAD_AUTHORS_SUCCESS,
  LOAD_AUTHORS_FAILURE,
} from '../../types'

const initialState: AuthorsState = {
  authors: [],
  isAuthorsLoaded: false,
  isLoading: false,
  error: '',
}

export function authorsReducer(state = initialState, action: AuthorsActions) {
  switch (action.type) {
  case LOAD_AUTHORS_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case LOAD_AUTHORS_SUCCESS:
    return {
      ...state,
      authors: action.payload,
      isLoading: false,
      isAuthorsLoaded: true,
    }
  case LOAD_AUTHORS_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    }
  default:
    return state
  }
}
