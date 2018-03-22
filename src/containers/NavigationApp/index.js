import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator, DrawerItems, SwitchNavigator } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';


import LoadingPage from '../LoadingPage';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import RegistrationPage from '../RegistrationPage';

import HomePark from '../ParkHomePage';
import ReqPark from '../RequestParking';
import Protected from '../../components/protected';
import RolePick from '../RolePickPage';
import LogoutPage from '../LogoutPage';

import { addListener } from '../../utilities/redux';

const customDrawerContentComponent = (props) => (
  <View style={{ flex: 1 }}>
    <Image 
      style={styles.drawerImage}
      source={require('../../.././assetts/ParkItLogoNavbar.png')} />
    <DrawerItems { ...props } />
  </View>
);

const unAuthDrawer = DrawerNavigator(
  {
    Home: { screen: HomePage },
    Login: { screen: LoginPage },
    Register: { screen: RegistrationPage }
  }, {
    initialRouteName: `Home`,
    contentComponent: customDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

const authDrawer = DrawerNavigator(
  {
    RolePick: { screen: RolePick },
    ParkHome: { screen: HomePark },
    ReviewPark: { screen: ReqPark },
    Logout: { screen: LogoutPage }
  }, {
    initialRouteName: 'RolePick',
    contentComponent: customDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

export const AppNavigator = SwitchNavigator(
  {
    Loading: LoadingPage,
    App: authDrawer,
    Auth: unAuthDrawer
  },
  {
    initialRouteName: `Loading`,
    headerMode: `none`
  }
);

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
  drawerImage: {
    height: 100,
    width: 280
  }
})

export default connect(mapStateToProps)(AppWithNavigationState);