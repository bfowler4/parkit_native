import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const HOST = `http://5c5ff349.ngrok.io/api`;

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = `SET_USER`;
export const SET_TOKEN = `SET_TOKEN`;

export const login = (email, password) => {
  return dispatch => {
    Axios.post(`${HOST}/login`, { email, password })
    .then(user => {
      const token = user.data.token;
      dispatch({
        type: SET_TOKEN,
        token: token
      });
      return dispatch({
        type: SET_USER,
        user: user.data.user
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

export const loadUser = (id) => {
  return (dispatch, getState) => {
    const { token } = getState().authentication;
    Axios.get(`${HOST}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(user => {
      return dispatch({
        type: SET_USER,
        user: user.data
      });
    })
    .catch(err => console.log(err.message));
  }
}