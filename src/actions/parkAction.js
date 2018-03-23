import Axios from "axios";
import { Alert, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

export const SPACE_REQUEST = "SPACE_REQUEST";
export const CUSTOMER_COORS = "REQUEST_INFO";
export const RESERVE_SPACE = "RESERVE_SPACE";

const REQUEST = `http://330436ca.ngrok.io/api`;

export const customercoors = location => {
  return dispatch => {
    dispatch({
      type: CUSTOMER_COORS,
      payload: location
    });
  };
};

export const spaceRequest = (lat, lng) => {
  const latlng = {
    longitude: lng,
    latitude: lat
  };
  return dispatch => {
    AsyncStorage.getItem(`token`, (err, token) => {
      Axios.post(`${REQUEST}/spaces/request`, latlng, {
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
    })
  };
};

export const reserveSpace = (space, requested, start, end) => {
  const data = {
    space_id: space,
    time_requested: requested,
    start_time: start,
    end_time: end
  };
  return dispatch => {
    AsyncStorage.getItem(`token`, (err, token) => {
      Axios.post(`${REQUEST}/spaces/reserve`, data, {
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
      .catch(err => console.log(err));
    });
  };
};
