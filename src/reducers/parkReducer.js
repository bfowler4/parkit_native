import {SPACE_REQUEST,CUSTOMER_COORS,RESERVE_SPACE} from '../actions/parkAction'

initialState = {
  space:null,
  customerCoors:null,
  reservedStall:null,
}

export default (state = initialState, action = {}) =>{
  switch (action.type){
    case SPACE_REQUEST:
   
    return {...state, space:action.payload}
    case CUSTOMER_COORS:
    
    return {...state, customerCoors:action.payload}
    case RESERVE_SPACE:
    
    return {...state, reservedStall:action.payload}
    default:
    return state;
  }
}