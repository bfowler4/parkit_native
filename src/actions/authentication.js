import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
      AsyncStorage.setItem(`token`, token)
      .then(() => {
        const redirect = NavigationActions.navigate({
          routeName: `Protected`
        });
        dispatch(redirect);
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

export const loadUser = () => {
  return dispatch => {
    AsyncStorage.getItem(`token`, (err, token) => {
      Axios.get(`${HOST}/user`, {
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
    })
  }
}