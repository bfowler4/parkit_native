import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Icon, Button, Header, Container, Content, Left } from 'native-base';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ``
    }
  }
  
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon name="ios-menu" onPress={() => this.props.navigation.navigate('DrawerOpen')} />
            </Left>
          </Header>
          <Content contentContainerStyle={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text>
            Home
            </Text>
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
    margin: 9,
    width: 200,
    borderColor: `black`,
    borderWidth: 1,
    borderStyle: `solid`,
    borderRadius: 5
  }
});

export default HomePage;