import { LOGIN, LOGOUT, SET_USER, SET_TOKEN } from '../actions/authentication';

const initialState = {
  isLoggedIn: false,
  token: ``,
  user: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}