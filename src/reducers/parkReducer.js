import {SPACE_REQUEST} from '../actions/parkAction'
import {CUSTOMER_COORS} from '../actions/parkAction'
initialState = {
  space:null,
  customerCoors:null
}

export default (state = initialState, action = {}) =>{
  switch (action.type){
    case SPACE_REQUEST:
   
    return {...state, space:action.payload}
    case CUSTOMER_COORS:
    console.log(action.payload);
    return {...state, customerCoors:action.payload}
    default:
    return state;
  }
}