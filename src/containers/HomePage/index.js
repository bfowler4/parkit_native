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
          <Image source={require('../../.././assetts/ParkItHomePage.png')}
            style={{ height: Dimensions.get(`screen`).height, width: Dimensions.get(`screen`).width, zIndex: -1, position: `absolute` }} />
          <TouchableOpacity
            style={styles.button1}
            onPress={() => this.props.navigation.navigate(`Login`)}>
            <Text style={{ color: `lightgrey` }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => this.props.navigation.navigate(`Register`)}>
            <Text style={{ color: `white` }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  button1: {
    justifyContent: `center`,
    alignItems: `center`,
    height: 40,
    margin: 10,
    width: 200,
    borderColor: `lightgrey`,
    borderWidth: 2,
    borderStyle: `solid`,
    borderRadius: 5
  },
  button2: {
    justifyContent: `center`,
    alignItems: `center`,
    height: 40,
    margin: 10,
    width: 200,
    backgroundColor: `#59B1B2`,
    borderWidth: 1,
    borderStyle: `solid`,
    borderRadius: 5
  }
});
export default HomePage;