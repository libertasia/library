import {
  LOAD_CURRENT_USER_FAILURE,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UserActions,
  UserState,
} from '../../types'

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: '',
}

export function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
  case LOAD_CURRENT_USER_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case LOAD_CURRENT_USER_SUCCESS:
    return {
      ...state,
      user: action.payload,
      isLoading: false,
    }
  case LOAD_CURRENT_USER_FAILURE:
    return {
      ...state,
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
  default:
    return state
  }
}
