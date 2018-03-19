import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, TextInput, Text, View, Alert, Image } from 'react-native';

import { Icon, Button, Header, Container, Content, Left } from 'native-base';

import { login } from '../../actions/authentication';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``
    }
  }

  static navigationOptions = {
    drawerIcon: (
      <Image source={require('../../.././assetts/Login.png')}
      style={{ height: 24, width: 24 }} />
    )
  }
  handleSubmit() {
    const {
      email,
      password
    } = this.state;
    this.props.login(email, password);
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
            Login
            </Text>
      <View style={styles.container}>
        <TextInput 
          placeholder='Email'
          autoCorrect={false}
          autoCapitalize={'none'}
          onChangeText={(email) => this.setState({ email })}/>
        <TextInput 
          placeholder='Password' 
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}/>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
          </Content>
        </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    }
  }
}

export default ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

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
