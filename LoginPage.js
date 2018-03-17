import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``
    }
  }

  handleChange(event) {
    console.log(event);
  }


  
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder='Email'
          onChange= {this.handleChange}/>
        <TextInput placeholder='Password' />
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
