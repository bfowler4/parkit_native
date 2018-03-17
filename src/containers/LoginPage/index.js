import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, TextInput, Text, View, Alert } from 'react-native';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder='Email'
          onChangeText={(email) => this.setState({ email })}/>
        <TextInput 
          placeholder='Password' 
          onChangeText={(password) => this.setState({ password })}/>
        <Text>{this.props.test}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default ConnectedLoginPage = connect(
  mapStateToProps
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
