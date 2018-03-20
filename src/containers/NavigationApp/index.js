import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator, DrawerItems, SwitchNavigator } from 'react-navigation';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Container, Content, Header, Body, Icon } from 'native-base';


import LoadingPage from '../LoadingPage';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import RegistrationPage from '../RegistrationPage';
import Protected from '../../components/protected';
import RolePick from '../RolePickPage';

import { addListener } from '../../utilities/redux';

const customDrawerContentComponent = (props) => (
  <Container>
    <Header style={{ height: 200 }}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('../../.././assetts/ParkItLogoNavbar.png')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems { ...props } />
    </Content>
  </Container>
)

const Drawer = DrawerNavigator({
  Home: {
    screen: HomePage,
  },
  Login: {
    screen: LoginPage,
  },
  Register: {
    screen: RegistrationPage
  },
}, {
    initialRouteName: 'Home',
    contentComponent: customDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });

  
const AppStack = StackNavigator(
  {
    RolePick: {
      screen: RolePick
    },
    ParkHome: {
      screen: Protected
    },
  }, 
  {
    initialRouteName: `RolePick`
  }
);

const AuthStack = StackNavigator(
  {
    Home: {
      screen: HomePage
    },
    Login: {
      screen: LoginPage
    },
    Register: {
      screen: RegistrationPage
    }
  }, 
  {
    initialRouteName: `Home`,
    headerMode: 'none',
  }
);

export const AppNavigator = SwitchNavigator(
  {
    Loading: LoadingPage,
    App: AppStack,
    Auth: AuthStack,
    NavDrawer: Drawer
  },
  {
    initialRouteName: `Loading`
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