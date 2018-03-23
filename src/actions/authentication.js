import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

const HOST = `http://f9960b6f.ngrok.io/api`;

export const SET_USER = `SET_USER`;
export const SET_TOKEN = `SET_TOKEN`;

export const register = (name, email, password) => {
  name = name.split(` `);
  const first_name = name[0];
  const last_name = name[1] || ``;
  return dispatch => {
    Axios.post(`${HOST}/register`, { first_name, last_name, email, password })
    .then(user => {
      dispatch({
        type: SET_USER,
        user: user.data.user
      });
      const token = user.data.token;
      AsyncStorage.setItem(`token`, token)
      .then(() => {
        const redirect = NavigationActions.navigate({
          routeName: `App`
        });
        dispatch(redirect);
      });
    })
    .catch(err => {
      (err.message);
    });
  }
}

export const login = (email, password) => {
  return dispatch => {
    Axios.post(`${HOST}/login`, { email, password })
    .then(user => {
      dispatch({
        type: SET_USER,
        user: user.data
      });
      const token = user.data.token;
      AsyncStorage.setItem(`token`, token)
      .then(() => {
        const redirect = NavigationActions.navigate({
          routeName: `App`
        });
        dispatch(redirect);
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: SET_USER,
      user: null
    });
    AsyncStorage.clear()
    .then(() => {
      const redirect = NavigationActions.navigate({
        routeName: `Auth`
      });
      dispatch(redirect);
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