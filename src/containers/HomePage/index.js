import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

import Container from '../../components/container';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    drawerIcon: (
      <Image source={require('../../.././assetts/Home.png')}
        style={{ height: 24, width: 24 }} />
    )
  }

  render() {
    return (
      <Container navigation={this.props.navigation}>
        <View style={styles.container}>
          <Image source={require('../../.././assetts/ParkItLogo9.png')}
            style={{ height: Dimensions.get(`screen`).height, width: Dimensions.get(`screen`).width, zIndex: -1, position: `absolute` }} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate(`Login`)}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate(`Register`)}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    justifyContent: `center`,
    alignItems: `center`,
    height: 40,
    margin: 10,
    width: 200,
    borderColor: `black`,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: `solid`,
    borderRadius: 5
  }
});
export default HomePage;