import Axios from "axios";
import { Alert } from 'react-native';
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxNjk5MjMxfQ.oH3HQi0BACY-1OWsN-_NWPkIGMTaZ5CtyYgJx1oz6eA";
const REQUEST = `http://a2ef8a84.ngrok.io/api/spaces/request`;
import { NavigationActions } from 'react-navigation';
export const SPACE_REQUEST = "SPACE_REQUEST";
export const CUSTOMER_COORS = "REQUEST_INFO";
export const RESERVE_SPACE = "RESERVE_SPACE";

export const spaceRequest = (lat, lng) => {
  let latlng = {
    longitude: lng,
    latitude: lat
  };

  return dispatch => {
    return Axios.post("http://localhost:8080/api/spaces/request", latlng, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(data => {
        let space = data.data;

        dispatch({
          type: SPACE_REQUEST,
          payload: space
        });
      })

      .catch(err => {
        console.log(err);
        Alert.alert(
          "Error",
          "Sorry We Could Not Find Any Stall In The Area",
          [
            {
              text: "Home",
              onPress: () => {
                const redirect = NavigationActions.navigate({
                  routeName: `ParkHome`
                });
                dispatch(redirect);
             }
            }
          ],
          { cancelable: false }
        )
      });
  };
};

export const customercoors = location => {
  return dispatch => {
    dispatch({
      type: CUSTOMER_COORS,
      payload: location
    });
  };
};
export const reserveSpace = ( space, requested, start, end) => {
  
  const data = {
    space_id: space,
    time_requested: requested,
    start_time: start,
    end_time: end
  };
 
  return dispatch => {
    return Axios.post("http://localhost:8080/api/spaces/reserve", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(data => {
       
        let reserve = data.data;
      
        dispatch({
          type: RESERVE_SPACE,
          payload: reserve
        });
      })
      .catch(err => {});
  };
};
