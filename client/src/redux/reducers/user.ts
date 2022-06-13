import {
  BooksActions,
  BORROW_BOOK_SUCCESS,
  LOAD_CURRENT_USER_FAILURE,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  RETURN_BOOK_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UserActions,
  UserState,
} from '../../types'

const initialState: UserState = {
  user: null,
  isUserLoaded: false,
  isLoading: false,
  error: '',
}

export function userReducer(
  state = initialState,
  action: UserActions | BooksActions
) {
  switch (action.type) {
  case LOAD_CURRENT_USER_REQUEST:
    return {
      ...state,
      isLoading: true,
      isUserLoaded: false,
    }
  case LOAD_CURRENT_USER_SUCCESS:
    return {
      ...state,
      user: action.payload,
      isUserLoaded: true,
      isLoading: false,
    }
  case LOAD_CURRENT_USER_FAILURE:
    return {
      ...state,
      isUserLoaded: false,
      isLoading: false,
      error: action.payload.msg,
    }
  case UPDATE_USER_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case UPDATE_USER_SUCCESS:
    return {
      ...state,
      user: action.payload,
      isLoading: false,
    }
  case UPDATE_USER_FAILURE:
    return {
      ...state,
      isLoading: false,
      error: action.payload.msg,
    }
  case BORROW_BOOK_SUCCESS:
    return {
      ...state,
      isUserLoaded: false,
    }
  case RETURN_BOOK_SUCCESS:
    return {
      ...state,
      isUserLoaded: false,
    }
  default:
    return state
  }
}
