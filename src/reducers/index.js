import { combineReducers } from "redux";
import nav from "./navigationReducer";
import test from './testReducer';

const AppReducer = combineReducers({
  nav: nav,
  test
});

export default AppReducer;