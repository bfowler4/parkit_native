import { combineReducers } from "redux";
import nav from "./navigationReducer";
import authenticationReducer from "./authenticationReducer";
import parkReducer from './parkReducer'

const AppReducer = combineReducers({
  nav: nav,
  authentication: authenticationReducer,
  park:parkReducer
});

export default AppReducer;