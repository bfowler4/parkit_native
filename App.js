import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import LoginPage from './LoginPage';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ``
    }
  }
  
  render() {
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
      </View>
    );
  }
}

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

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginPage
    }
  },
  {
    initialRouteName: `Home`
  }
);

//Initial development commit