import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Keyboard, Animated } from 'react-native';


import Container from '../../components/container';
import FloatingLabelInput from '../FloatingLabelInput';

class PaymentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: ``,
      expiration: ``,
      cvv: ``,
      zipcode: ``
    }

    this.keyboardHeight = new Animated.Value(0);
    this.buttonPosition = new Animated.Value(0);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(`keyboardWillShow`, this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener(`keyboardWillHide`, this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      }),
      Animated.timing(this.buttonPosition, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      }),
    ]).start();
  }

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.buttonPosition, {
        duration: event.duration,
        toValue: 0
      })
    ]).start();
  }

  render() {
    return (
      <Container navigation={this.props.navigation}>
        <View style={styles.container}>
          <Text style={styles.header}>Payment Method</Text>
          <View style={{ width: `80%` }}>
            <FloatingLabelInput
              label='Card Number'
              value={this.state.cardNumber}
              keyboardType='numeric'
              maxLength={19}
              onChangeText={number => {
                const length = number.length;
                if (length < this.state.cardNumber.length) {
                  if (number === this.state.cardNumber.trim() && number.charAt(length - 1 !== ` `)) {
                    return this.setState({ cardNumber: number.slice(0, -1) });
                  }
                }
                if (length === 4 || length === 9 || length === 14) {
                  number = `${number} `;
                }
                this.setState({ cardNumber: number })
              }} />
          </View>
          <View style={{ flexDirection: `row`, width: '80%', justifyContent: `space-between` }}>
            <View style={{ width: '40%' }}>
              <FloatingLabelInput
                label='Exp. Date'
                value={this.state.expiration}
                keyboardType='numeric'
                maxLength={5}
                onChangeText={date => {
                  const length = date.length;
                  if (length < this.state.expiration.length) {
                    return this.setState({ expiration: date });
                  }
                  if (length === 1 && date !== `0` && date !== `1`) {
                    return this.setState({ expiration: `0${date}/` });
                  }
                  if (length === 2) {
                    return this.setState({ expiration: `${date}/` });
                  }
                  this.setState({ expiration: date });

                }} />
            </View>
            <View style={{ width: '40%' }}>
              <FloatingLabelInput
                label='CVV'
                value={this.state.cvv}
                keyboardType='numeric'
                maxLength={this.state.cardNumber.startsWith(`3`) ? 4 : 3}
                onChangeText={number => this.setState({ cvv: number })} />
            </View>
          </View>
          <View style={{ width: `80%` }}>
            <FloatingLabelInput
              label='Zip Code'
              value={this.state.zipcode}
              keyboardType='numeric'
              maxLength={5}
              onChangeText={number => this.setState({ zipcode: number })} />
          </View>
        </View>
        <Animated.View style={{ paddingBottom: this.buttonPosition }}>
          <TouchableOpacity style={styles.button}>
            <Text>Save</Text>
          </TouchableOpacity>
        </Animated.View>
      </Container>
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
  }
}

export default ConnectedPaymentPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: `white`
  },
  header: {
    alignSelf: `flex-start`,
    marginLeft: 20,
    fontSize: 30
  },
  button: {
    justifyContent: `center`,
    alignItems: `center`,
    bottom: 0,
    height: 40,
    width: '100%',
    backgroundColor: `lightgrey`,
  }
})