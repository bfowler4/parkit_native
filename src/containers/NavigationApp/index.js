import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import HomePark from '../ParkHomePage';
import { addListener } from '../../utilities/redux';

export const AppNavigator = StackNavigator({
  Home: {
    screen: HomePage
  },
  Login: {
    screen: LoginPage
  },
  HomePark:{
    screen:HomePark
  }
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

export default connect(mapStateToProps)(AppWithNavigationState);