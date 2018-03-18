import { AppNavigator } from '../containers/NavigationApp';

// Set initial state to home
const firstAction = AppNavigator.router.getActionForPathAndParams('HomePark');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
  let nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;