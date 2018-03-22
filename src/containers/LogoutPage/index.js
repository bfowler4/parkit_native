import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions/authentication';

class LogoutPage extends Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  }
}

export default ConnectedLogoutPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutPage);