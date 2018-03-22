import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';


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
  }

  render() {
    return (
      <Container navigation={this.props.navigation}>
        <View style={styles.container}>
          <View style={styles.paymentContainer}>
          <Text style={styles.header}>Payment Method</Text>
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
          <FloatingLabelInput
            label='CVV'
            value={this.state.cvv}
            keyboardType='numeric'
            maxLength={this.state.cardNumber.startsWith(`3`) ? 4 : 3}
            onChangeText={number => this.setState({ cvv: number })} />
          <FloatingLabelInput
            label='Zip Code'
            value={this.state.zipcode}
            keyboardType='numeric'
            maxLength={5}
            onChangeText={number => this.setState({ zipcode: number })} />
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: `white` }}>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: 'center',
    backgroundColor: `#EBEBEB`
  },
  paymentContainer: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
    width: '85%',
    maxHeight: `50%`,
    backgroundColor: `white`,
    borderRadius: 18,
  },
  header: {
    position: `absolute`,
    top: 0,
    left: 0,
    marginTop: 20,
    marginLeft: 20,
    fontSize: 30
  },
  button: {
    position: `absolute`,
    justifyContent: `center`,
    alignItems: `center`,
    bottom: 0,
    height: 40,
    width: '100%',
    backgroundColor: `black`,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  }
})