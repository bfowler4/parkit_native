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
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from "react-redux";
import geolib from "geolib";
import MapViewDirections from "../../utilities/MapViewDirections";
import Axios from "axios";
import { reserveSpace } from "../../actions/parkAction";
import Container from "../../components/container";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyDa4lLi7DOGlx9ODC8q9xpyOMG53S-EXKU";

class ReqPark extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  };

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
      distance: null
    };

    this.mapView = null;
    this.isMountedStill = false;
  }

  componentDidMount() {
    this.isMountedStill = true;
    setTimeout(() => {
      if (this.isMountedStill) {
        this.setState({ isReady: true });
      }
    }, 60000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.space && !this.state.distance) {
      let space = {
        latitude: nextProps.space.latitude,
        longitude: nextProps.space.longitude
      };

      let customer = {
        latitude: this.props.customer.latitude,
        longitude: this.props.customer.longitude
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

  componentWillUnmount() {
    this.isMountedStill = false;
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

    this.props.navigation.state.params.state.chosenDate.getTime();

    if (!this.state.distance) {

      return (
        <View
          style={{ flex: 1, justifyContent: `center`, alignItems: `center` }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    let space = {
      latitude: this.props.space.latitude,
      longitude: this.props.space.longitude
    };


    let customer = {
      latitude: this.props.customer.latitude,
      longitude: this.props.customer.longitude
    }

    if (this.state.distance.data.rows[0].elements[0].status === "ZERO_RESULTS") {
      return <View>
        {Alert.alert(
          "Error",
          "No Stalls In Range",
          [
            {
              text: "Home",
              onPress: () => {
                this.props.navigation.navigate(`ParkHome`);

              }
            }
          ],
          { cancelable: false }
        )}
      </View>
    }
    let distanceMiles = this.state.distance.data.rows[0].elements[0].distance
      .text;

    let duration = parseInt(
      this.state.distance.data.rows[0].elements[0].duration.text.match(/\d+/)[0]
    );

    let convertUnix = (duration + 5) * 60 * 1000;

    let start_time = new Date().getTime() + convertUnix;
    let end_time = this.props.navigation.state.params.state.chosenDate.getTime();
    const reservationDuration = getDuration(start_time, end_time);
    const price = `$${(Math.ceil((end_time - start_time) / 60000 * 0.033333333 * 100) / 100).toFixed(2)}`;
    let formattedStartTime = new Date(start_time).toLocaleTimeString().split(` `);
    formattedStartTime = `${formattedStartTime[0].slice(0, -3)} ${formattedStartTime[1]}`;
    let formattedEndTime = new Date(end_time).toLocaleTimeString().split(` `);
    formattedEndTime = `${formattedEndTime[0].slice(0, -3)} ${formattedEndTime[1]}`;
    let space_id = this.props.space.id;
    let time_requested = new Date().getTime();


    return (
      <Container navigation={this.props.navigation}>
        <View style={styles.timeHeader}>
          <MaterialIcons name='access-time' size={20} style={styles.icon} color='#59B1B2' />
          <Text style={{ padding: 15, color: `white` }}>{formattedStartTime} - {formattedEndTime}</Text>
        </View>
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
            style={{ flex: 1 }}
            ref={c => (this.mapView = c)}
            showsUserLocation={true}
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
          <View
            style={{
              flex: 0.3,
              alignItems: "center",
              backgroundColor: "black"
            }}>
            <View style={{ alignSelf: `flex-start`, paddingLeft: 20, paddingTop: 20 }}>
              <Text style={styles.text}>
                {`${duration} minutes to destination, ${distanceMiles}`}
              </Text>
              <Text style={styles.text}>
                {`Duration: ${reservationDuration}`}
              </Text>
              <Text style={styles.text}>
                {`Price: ${price}`}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.reserveSpace(
              space_id,
              time_requested,
              start_time,
              end_time
            );
            this.props.navigation.navigate("ConfirmPark");
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Reserve
                </Text>
        </TouchableOpacity>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: "#59B1B2",
    zIndex: 100,
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  timeHeader: {
    flexDirection: `row`,
    width: `100%`,
    backgroundColor: `black`,
    borderTopWidth: 1,
    borderTopColor: `white`,
  },
  icon: {
    paddingVertical: 13,
    paddingLeft: 15
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

function getDuration(startTime, endTime) {
  let minutes = Math.ceil((endTime - startTime) / 60000);
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  if (hours === 0) {
    return `${minutes} minutes`;
  } else if (minutes === 0) {
    return `${hours} hours`;
  } else {
    return `${hours} hours and ${minutes} minutes`;
  }
}