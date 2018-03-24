import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Text,
  View,
  Alert,
  Platform,
  TouchableHighlight,
  Picker,
  Button,
  DatePickerIOS,
  Keyboard,
  Animated
} from "react-native";
import Modal from 'react-native-modal';
import { MapView, Constants, Location, Permissions } from "expo";
import { MaterialIcons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { spaceRequest } from "../../actions/parkAction";
import { customercoors } from "../../actions/parkAction";
import Dimensions from "Dimensions";
import Container from '../../components/container';


class HomePark extends Component {
  static navigationOptions = {
    drawerLabel: () => 'Find a Space'
  }
  constructor(props) {
    super(props);

    this.state = {
      lat: 21.2969,
      lng: -157.8171,
      key: ``,
      targLat: 21.2969,
      targLng: -157.8171,
      location: null,
      autocomplete: `Where do you want to park?`,
      err: null,
      modalVisible: false,
      chosenDate: new Date(new Date().getTime() + 3600000),
      newTime: false
    };

    this.setDate = this.setDate.bind(this);
    this.keyboardHeight = new Animated.Value(0);
    this.baseMargin = Dimensions.get(`window`).height - 450;
    this.clockMargin = new Animated.Value(this.baseMargin);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate, newTime: true })
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(`keyboardWillShow`, this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener(`keyboardWillHide`, this.keyboardWillHide);
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage: "Not Compadible With Androids Or None Modile Devices!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      }),
      Animated.timing(this.clockMargin, {
        duration: event.duration,
        toValue: 50
      }),
    ]).start();
  }

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.clockMargin, {
        duration: event.duration,
        toValue: this.baseMargin
      })
    ]).start();
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
    this.setState({ lat: location.coords.latitude, lng: location.coords.longitude })
    this.setState({ key: Math.random() });
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

    this.props.navigation.navigate("ReviewPark", { state: this.state });
  }

  render() {
    if (!this.state.location) {
      return (
        <View
          style={{ flex: 1, justifyContent: `center`, alignItems: `center` }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    return (
      <Container navigation={this.props.navigation}>
        <View style={{ flex: 1 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{ flex: 1 }}>
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
                  // 
                  this.setState({ autocomplete: details.formatted_address })
                  this.setState({
                    lat: details.geometry.location.lat,
                    lng: details.geometry.location.lng
                  });
                  this.setState({
                    targLat: details.geometry.location.lat,
                    targLng: details.geometry.location.lng
                  });
                  this.setState({ key: Math.random() });
                }}
                query={{
                  key: "AIzaSyCrACMzBiHlUg7YaKRFMww3BL7K8ym3QFI",
                  language: "en",
                  types: ["geocode", "establishment"]
                }}
                styles={{
                  textInputContainer: {
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    backgroundColor: `white`,
                    paddingTop: 30
                  },
                  listView: {
                    paddingTop: 30
                  },
                  textInput: {
                    height: 38,
                    color: "#5d5d5d",
                    fontSize: 16,
                    borderWidth: 0,
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb"
                  },
                  poweredContainer: {
                    height: 0
                  },
                  powered: {
                    height: 0
                  }
                }}
              />
              <Animated.View style={{ paddingBottom: this.clockMargin }}>
                <Text style={{ color: `#59B1B2`, paddingLeft: 20, fontSize: 20 }}>When do you plan to leave?</Text>
                <DatePickerIOS
                  date={this.state.chosenDate}
                  onDateChange={this.setDate}
                  minimumDate={new Date(new Date().getTime() + 3600000)}
                  maximumDate={new Date(new Date().setHours(23, 59, 59, 0))}
                />
              </Animated.View>
            </View>
            <View style={{ display: 'flex', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{ color: `white`, fontWeight: `600`, fontSize: 16 }}>Apply</Text>
              </TouchableHighlight>
            </View>
          </Modal>
          <View style={{
            width: screenWidth * .85,
            position: `absolute`,
            top: '10%',
            zIndex: 100000,
            alignSelf: `center`,
          }}>
            <TouchableHighlight
              style={{
                width: screenWidth * .85,
                shadowColor: `black`,
                shadowOffset: { width: 5, height: 5 },
                shadowRadius: 10,
                shadowOpacity: .5
              }}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={{
                padding: 10,
                marginLeft: 0,
                marginRight: 0,
                color: "#5d5d5d",
                backgroundColor: 'white',
                fontSize: 16,
                borderWidth: 0
              }}>{this.state.autocomplete}</Text>
            </TouchableHighlight>
            {(this.state.autocomplete.startsWith(`Where do you`) && !this.state.newTime) && <MaterialIcons name='access-time' size={20} style={styles.icon} color='#5d5d5d' />}
            {(this.state.autocomplete.startsWith(`Where do you`) && !this.state.newTime) && <Text style={styles.line}>|</Text>}
            {(this.state.autocomplete.startsWith(`Where do you`) && !this.state.newTime) && <Text style={styles.timeStamp}>1 hour</Text>}
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
            followUserLocation={true}>
            <MapView.Marker
              coordinate={{
                latitude: this.state.targLat,
                longitude: this.state.targLng
              }} />
          </MapView>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}>
          <Text style={{ color: `white`, fontWeight: `600`, fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: "#59B1B2",
    zIndex: 100,
  },
  icon: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
    marginTop: 10
  },
  line: {
    position: `absolute`,
    right: 0,
    marginRight: 87,
    fontSize: 30,
    color: `#cccccc`
  },
  timeStamp: {
    position: `absolute`,
    padding: 10,
    fontSize: 16,
    right: 0,
    marginRight: 25,
    color: `#5d5d5d`
  }
});

const mapStateToProps = state => {
  return {
    space: state.park.space,
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
