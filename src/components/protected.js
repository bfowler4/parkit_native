import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';


import { loadUser, logout } from '../actions/authentication';

class Protected extends Component {
  // componentWillMount() {
  //   this.props.loadUser();
  // }

  render() {
    console.log(this.props.user);
    return (
      <View style={{ flex: 1 }}>
        <Text>Hello from protected</Text>
        <TouchableOpacity style={styles.button} onPress={this.props.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
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
    loadUser: () => {
      dispatch(loadUser());
    },
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