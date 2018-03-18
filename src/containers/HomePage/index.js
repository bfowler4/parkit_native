import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

import RolePick from '../RolePickPage';
import { loadUser } from '../../actions/authentication';


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewToDisplay: ``
    }
  }

  componentWillMount() {
    return AsyncStorage.getItem(`token`, (err, result) => {
      if (result) {
        return AsyncStorage.getItem(`activeRole`, (err, result) => {
          if (result) {
            this.setState({ viewToDisplay: result });
          } else {
            this.setState({ viewToDisplay: `rolePick` });
          }
        });
      } else {
        this.setState(`unauthenticated`);
      }
    })
  }
  
  render() {
    switch (this.state.viewToDisplay) {
      case `park`:
        return (<Text>Park</Text>);
      case `host`:
        return (<Text>Host</Text>);
      case `rolePick`:
        return <RolePick />;
      case ``:
        return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(`Login`)}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert(`Registered!`)}>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate(`RolePick`)}>
          <Text>Role picker</Text>
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
    }
  }
}

export default ConnectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50
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
    borderRadius: 5
  }
});