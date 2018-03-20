import Axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUyMTMzODgzOH0.tf0xNtlbU7WKhLNlbF_ZJuI3zVyRujk1jBd2zfozWWM";
const REQUEST = `http://9400c1a9.ngrok.io/api/spaces/request`;
export const SPACE_REQUEST = "SPACE_REQUEST";
export const CUSTOMER_COORS = "REQUEST_INFO"



export const spaceRequest = (lat, lng) => {
  
  let latlng = {
    longitude: lng,
    latitude: lat
  };
  return dispatch => {
    return Axios.post('http://localhost:8080/api/spaces/request', latlng, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(data => {
        let space = data.data;
        dispatch({
          type: SPACE_REQUEST,
          payload: space
        })
      })
      
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const customercoors = location => {
  return dispatch =>{
    dispatch({
      type:CUSTOMER_COORS,
      payload:location
    })
  }
}



