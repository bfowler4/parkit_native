import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, SwitchNavigator } from 'react-navigation';

import LoadingPage from '../LoadingPage';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import HomePark from '../ParkHomePage';
import ReqPark from '../RequestParking';
import RegistrationPage from '../RegistrationPage';
import Protected from '../../components/protected';
import RolePick from '../RolePickPage';


import { addListener } from '../../utilities/redux';

const AppStack = StackNavigator(
  {
    RolePick: {
      screen: RolePick
    },
    ParkHome: {
      screen: HomePark
    },

    ReviewPark: {
      screen: ReqPark
    }
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
    initialRouteName: `Home`
  }
);

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