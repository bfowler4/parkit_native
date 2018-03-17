import { LOGIN, LOGOUT } from '../actions/authentication';

const initialState = {
  isLoggedIn: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}