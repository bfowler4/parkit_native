import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import AppReducer from './reducers'

const NavMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

let middleware = [thunk, NavMiddleware, addListener];

const store = createStore(
  AppReducer,
  applyMiddleware(...middleware)
);

export default store;