import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Alert,
  Platform
} from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { spaceRequest } from "../../actions/parkAction";
import { customercoors } from "../../actions/parkAction";
import Dimensions from "Dimensions";

class HomePark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 21.2969,
      lng: -157.8171,
      key: ``,
      targLat: 21.2969,
      targLng: -157.8171,
      location: null,
      err: null
    };
  }
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage: "Not Compadible With Androids Or None Modile Devices!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    this.props.customercoors(location);
  };

  onRegionChange(region) {
    this.setState({ targLat: region.latitude, targLng: region.longitude });
  }
  handleSubmit() {
    this.props.spaceRequest(this.state.targLat, this.state.targLng);

    this.state.location
      ? this.props.customercoors(this.state.location.coords)
      : console.log("no location");

    this.props.navigation.navigate("ReviewPark");
  }

  render() {
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.35 }}>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={"default"}
            fetchDetails={true}
            // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              this.setState({
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng
              });
              this.setState({
                targLat: details.geometry.location.lat,
                targLng: details.geometry.location.lng
              });
              this.setState({ key: Math.random() });
              console.log(this.state);
            }}
            query={{
              key: "AIzaSyCrACMzBiHlUg7YaKRFMww3BL7K8ym3QFI",
              language: "en", // language of the results
              types: "geocode" // default: 'geocode'
            }}
            styles={{
              textInputContainer: {
                backgroundColor: "rgba(0,0,0,0)",
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: "#5d5d5d",
                fontSize: 16
              },
              predefinedPlacesDescription: {
                color: "#1faadb"
              }
            }}
          />
        </View>
        <MapView
          style={{ flex: 1 }}
          key={this.state.key}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.05 * (screenWidth / screenHeight),
            longitudeDelta: 0.05 * (screenWidth / screenHeight)
          }}
          followUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.targLat,
              longitude: this.state.targLng
            }}
          />
        </MapView>
        <View
          style={{
            flex: 0,
            justifyContent: `center`,
            alignItems: `center`,
            backgroundColor: "white"
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: "grey"
  }
});

const mapStateToProps = state => {
  return {
    space: state.park.space
  };
};

const mapDispatchToProps = dispatch => {
  return {
    spaceRequest: (lat, lng) => {
      dispatch(spaceRequest(lat, lng));
    },
    customercoors: location => {
      dispatch(customercoors(location));
    }
  };
};

export default (ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePark));
