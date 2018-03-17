import { combineReducers } from "redux";
import nav from "./navigationReducer";
import login from "./loginReducer";

const AppReducer = combineReducers({
  nav: nav,
  login: login
});

export default AppReducer;