import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, SwitchNavigator } from 'react-navigation';

import LoadingPage from '../LoadingPage';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import RegistrationPage from '../RegistrationPage';
import Protected from '../../components/protected';
import RolePick from '../RolePickPage';

import { addListener } from '../../utilities/redux';

const AppStack = StackNavigator({
  Home: {
    screen: Protected
  },
  RolePick: {
    screen: RolePick
  }
});

const AuthStack = StackNavigator({
  Home: {
    screen: HomePage
  },
  Login: {
    screen: LoginPage
  },
  Register: {
    screen: RegistrationPage
  }
});

export const AppNavigator = SwitchNavigator(
  {
    Loading: LoadingPage,
    App: AppStack,
    Auth: AuthStack
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

export default connect(mapStateToProps)(AppWithNavigationState);