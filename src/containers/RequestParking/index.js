import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import { Constants, MapView } from "expo";
import { connect } from "react-redux";
import geolib from "geolib";
import MapViewDirections from "../../utilities/MapViewDirections";
import Axios from "axios";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyAQ2u55pz05mQhaCKQiax4VQnTKK3UMJnI";

class ReqPark extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

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
    };

    this.mapView = null;
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
        !this.state.distance ? this.setState({ distance: result }) : console.log('stop')
        return true
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
  }

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

    //<---------------do work here

    let space = {
      latitude: this.props.space.latitude,
      longitude: this.props.space.longitude
    };

    let customer = {
      latitude: 21.296923,
      longitude: -157.822839
    };

    let distanceMiles = Number(this.state.distance.data.rows[0].elements[0].distance.text.replace(/[^0-9\.]+/g, ""));
    let duration = parseInt(this.state.distance.data.rows[0].elements[0].duration.text.match(/\d+/)[0]);








    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: this.props.space.latitude,
            longitude: this.props.space.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
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
        </MapView>
        <View>
          <View >
            <Text>{`${distanceMiles} miles`}</Text>
            <Text>{`${duration} minutes to destination`}</Text>
          </View>
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
  }
});

const mapStateToProps = state => {
  return {
    space: state.park.space,
    customer: state.park.customerCoors
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default (ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReqPark));
