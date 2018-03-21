import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage, DatePickerIOS } from 'react-native';


import { logout } from '../actions/authentication';
import Container from './container';

class Protected extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenDate: new Date()
    };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    return (
      <Container navigation={this.props.navigation}>
        <View style={{ flex: 1, backgroundColor: `red` }}>
        </View>
        <View style={{ flex: 1, justifyContent: `flex-end` }}>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate} 
            minimumDate={new Date(new Date().getTime() + 3600000)}
            maximumDate={new Date(new Date().setHours(23, 59, 59, 0))} />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  }
}

export default ConnectedProtected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Protected);

const styles = StyleSheet.create({
  button: {
    justifyContent: `center`,
    alignItems: `center`,
    height: 40,
    width: 200,
    borderColor: `black`,
    borderWidth: 1,
    borderStyle: `solid`,
    borderRadius: 5
  }
})