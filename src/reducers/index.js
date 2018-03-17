import { combineReducers } from "redux";
import nav from "./navigationReducer";
import authenticationReducer from "./authenticationReducer";

const AppReducer = combineReducers({
  nav: nav,
  authentication: authenticationReducer
});

export default AppReducer;