import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Container, Content, Header, Body, Icon } from 'native-base';

import HomePage from '../HomePage';
import LoginPage from '../LoginPage';

import { addListener } from '../../utilities/redux';

const customeDrawerContentComponent = (props) => (
  <Container>
    <Header style={{ height: 200 }}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('../../.././assetts/ParkItLogoNavbar2.png')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems { ...props } />
    </Content>
  </Container>
)

export const AppNavigator = DrawerNavigator({
  Home: {
    screen: HomePage,
  },
  Login: {
    screen: LoginPage,
  }
}, {
    initialRouteName: 'Home',
    contentComponent: customeDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });


class AppWithNavigationState extends React.Component {
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  drawerImage: {
    height: 100,
    width: 280
  }
})

export default connect(mapStateToProps)(AppWithNavigationState);