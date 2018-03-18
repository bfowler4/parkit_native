import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './reducers';
import AppWithNavigationState from './containers/NavigationApp';
import { middleware, thunk } from './utilities/redux';


const store = createStore(
  AppReducer,
  applyMiddleware(middleware, thunk),
);

class ReduxExampleApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default ReduxExampleApp;