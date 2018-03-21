import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Constants, MapView, Marker } from "expo";
import { connect } from "react-redux";
import geolib from "geolib";
import MapViewDirections from "../../utilities/MapViewDirections";
import Axios from "axios";
import { reserveSpace } from "../../actions/parkAction";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyDa4lLi7DOGlx9ODC8q9xpyOMG53S-EXKU";

class ReqPark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        {
          latitude: 21.296923,
          longitude: -157.822839
        },
        {
          latitude: 21.296923,
          longitude: -157.822839
        }
      ],
      toggle: null,
      isReady: null,
      distance: null,
      end_time: 1521694911520
    };

    this.mapView = null;
  }
  componentDidMount() {
    {
      setTimeout(function() {
        onTimeOut();
      }, 60000);
    }

    onTimeOut = () => {
      this.setState({ isReady: true });
      console.log("state changed", this.state.isReady);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.space && !this.state.distance) {
      let space = {
        latitude: nextProps.space.latitude,
        longitude: nextProps.space.longitude
      };


      let customer = {
        latitude: 21.296923,
        longitude: -157.822839
      };
      let destinationURL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&mode=driving&origins=${
        space.latitude
      },${space.longitude}&destinations=${customer.latitude},${
        customer.longitude
      }&key${GOOGLE_MAPS_APIKEY}`;
      Axios.get(destinationURL).then(result => {
        !this.state.distance
          ? this.setState({ distance: result })
          : console.log("stop");
        return true;
      });
    }
  }


  onReady = result => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20
      }
    });
  };

 
  onError = errorMessage => {
    Alert.alert(errorMessage);
  };


  render() {
    if (!this.state.distance) {
      return (
        <View
          style={{ flex: 1, justifyContent: `center`, alignItems: `center` }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
   ;

    let space = {
      latitude: this.props.space.latitude,
      longitude: this.props.space.longitude
    };

    let customer = {
      latitude: 21.296923,
      longitude: -157.822839
    };
    let distanceMiles = this.state.distance.data.rows[0].elements[0].distance
      .text;
    let duration = parseInt(
      this.state.distance.data.rows[0].elements[0].duration.text.match(/\d+/)[0]
    );
    let convertUnix = (duration + 5) * 60;
    let start_time = new Date().getTime() + convertUnix;
    let user_id = this.props.space.user_id;
    let space_id = this.props.space.id;
    let time_requested = new Date().getTime();


    return (
      <View style={styles.container}>
        {this.state.isReady
          ? Alert.alert(
              "Timed Out",
              "Sorrry caaaaaaaz",
              [
                {
                  text: "Parking Page",
                  onPress: () => {
                    this.props.navigation.navigate(`ParkHome`);
                    this.setState({isReady:null})
                  }
                }
              ],
              { cancelable: false }
            )
          : false}
        <MapView
          initialRegion={{
            latitude: this.props.space.latitude,
            longitude: this.props.space.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          style={StyleSheet.absoluteFill}
          ref={c => (this.mapView = c)}
        >
          {this.state.coordinates.length === 2 && (
            <MapViewDirections
              origin={space}
              destination={customer}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              onReady={this.onReady}
              onError={this.onError}
            />
          )}

          <MapView.Marker coordinate={customer} />
          <MapView.Marker coordinate={space} />
        </MapView>

        <View>
          <View>
            <Text>{`${distanceMiles}`}</Text>
            <Text>{`${duration} minutes to destination`}</Text>
            <Text>{`Start ${start_time} End ${this.state.end_time}`}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.reserveSpace(
                user_id,
                space_id,
                time_requested,
                start_time,
                this.state.end_time
              );
            }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  button: {
    justifyContent: `center`,
    alignItems: `center`,
    height: 40,
    margin: 9,
    width: 200,
    borderColor: `black`,
    borderWidth: 1,
    borderStyle: `solid`,
    borderRadius: 5,
    backgroundColor: "grey",
    zIndex: 100
  }
});

const mapStateToProps = state => {
  return {
    space: state.park.space,
    customer: state.park.customerCoors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reserveSpace: (user, space, requested, start, end) => {
      dispatch(reserveSpace(user, space, requested, start, end));
    }
  };
};

export default (ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReqPark));
