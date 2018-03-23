import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

import Container from '../../components/container';

class RolePick extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  handleSetPark() {
    AsyncStorage.setItem(`activeRole`, `park`)
    .then(() => {
      this.props.navigation.navigate(`ParkHome`);    
    });
  }
  
  handleSetHost() {
    AsyncStorage.setItem(`activeRole`, `host`)
    .then(() => {
      this.props.navigation.navigate(`HostHome`);
    });
  }


  render() {
    return (
      <Container navigation={this.props.navigation}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button1}
            value={`park`}
            onPress={this.handleSetPark.bind(this)}>
            <Text style={{ color: `lightgrey` }}>Park with Parkit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={this.handleSetHost.bind(this)}>
            <Text>Host with Parkit</Text>
          </TouchableOpacity>
        </View>
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
  }
}

export default ConnectedRolePick = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolePick);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: `black`
  },
  button1: {
    justifyContent: `center`,
    alignItems: `center`,
    height: 40,
    margin: 9,
    width: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: `lightgrey`
  },
  button2: {
    justifyContent: `center`,
    alignItems: `center`,
    height: 40,
    margin: 9,
    width: 200,
    borderRadius: 5,
    backgroundColor: `lightgrey`
  }
})