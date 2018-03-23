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
import Axios from "axios";
import { connect } from "react-redux";
import geolib from "geolib";
import MapViewDirections from "../../utilities/MapViewDirections";
import Container from "../../components/container";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = "AIzaSyDa4lLi7DOGlx9ODC8q9xpyOMG53S-EXKU";

class ConfirmPark extends Component {
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
      distance: null
    };

    this.mapView = null;
  }

  componentWillMount() {
    if (this.props.space && !this.state.distance) {
      let space = {
        latitude: this.props.space.latitude,
        longitude: this.props.space.longitude
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
    if (!this.state.distance || !this.props.reservation || !this.props.reservation.reservedStall) {
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
      latitude: this.props.customer.latitude?this.props.customer.latitude:this.props.customer.coords.latitude,
      longitude: this.props.customer.longitude?this.props.customer.longitude:this.props.customer.coords.longitude
    };
    

    let startTime = new Date(
      this.props.reservation.reservedStall.start_time
    ).toLocaleTimeString();
    
    let endTime = new Date(
      this.props.reservation.reservedStall.end_time
    ).toLocaleTimeString();
    let address = this.props.address.space.address;
    let description = this.props.space.description;
    let price = this.props.address.price;
    return (
      <Container navigation={this.props.navigation}>
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: this.props.space.latitude,
              longitude: this.props.space.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            style={{ flex: 1 }}
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
          <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center', backgroundColor: 'black' }}>
            <View style={{ flex: 0.8, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>

              <Text>{`Price: ${price}`}</Text>
              <Text>{`start time:${startTime} end time:${endTime}`}</Text>
              <Text>{`${address.street} ${address.city} ${address.state}`}</Text>
              <Text>{`Instructions: ${description}`}</Text>

            </View>
          </View>
        </View>
      </Container>
    )
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
    reservation: state.park,
    address: state.park.reservedStall,
    customer: state.park.customerCoors
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default (ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPark));
