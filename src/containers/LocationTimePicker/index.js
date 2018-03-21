import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, TextInput, Text, View, Alert, Platform } from "react-native";
import { Constants, Location, Permissions } from "expo";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

class LocationTimePicker extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      pickerSelection: 'Default value'
    }
  }
  
  render() {
    return (
      <Text>Hi</Text>
    )
  }
}

export default LocationTimePicker;