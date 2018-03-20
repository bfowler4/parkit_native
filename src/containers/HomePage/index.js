import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Icon, Button, Header, Container, Content, Left } from 'native-base';

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
      <Container>
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Icon name="ios-menu" style={{ color: 'black' }}
              onPress={() => this.props.navigation.navigate('DrawerOpen')} />
          </Left>
        </Header>
        <Content contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text>
            Home
            </Text>
          <Image source={require('../../.././assetts/ParkItLogo9.png')}
            style={{ height: 760, width: 500 }} />
          <View style={styles.container}>
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
        </Content>
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
    paddingBottom: 50
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