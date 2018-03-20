import { AppNavigator } from '../containers/NavigationApp';

function nav(state, action) {
  let nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;