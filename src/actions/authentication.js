import Axios from 'axios';

const HOST = `http://c379d4d7.ngrok.io/api`;

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
  return dispatch => {
    Axios.post(`${HOST}/login`, { email, password })
    .then(user => {
      console.log(user.data);
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}