import { SET_USER, SET_TOKEN } from '../actions/authentication';

const initialState = {
  isLoggedIn: false,
  token: ``,
  user: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}