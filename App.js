import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View stye={{ flex: 1, alignItems: `center`, justifyContent: `center` }}> 
        <Text>Hello World!</Text>
      </View>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  }
});