import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

import HomePage from '../HomePage';
import LoginPage from '../LoginPage';

import { addListener } from '../../utilities/redux';

export const AppNavigator = DrawerNavigator({
  Home: {
    screen: HomePage,
  },
  Login: {
    screen: LoginPage,
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