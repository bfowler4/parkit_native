import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';


import { loadUser } from '../actions/authentication';

class Protected extends Component {
  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    console.log(this.props.user);
    return (
      <Text>Hello from protected</Text>
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
    }
  }
}

export default ConnectedProtected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Protected);
