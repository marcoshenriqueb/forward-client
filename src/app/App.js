import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from './router';

import actions from './store/actions';

const { checkToken: checkTokenAction } = actions;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.token.length,
    };
  }

  componentDidMount() {
    if (!this.props.token.length) return;

    this.props.checkToken(this.props.token)
      .then(() => {
        console.log('Token checked');
        this.setState({
          loading: false,
        });
      }).catch(() => {
        console.log('Token invalid');
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    if (this.state.loading) return <div>Loading</div>;

    return (
      <Router>
        <div>
          { Routes(this.props.authenticated) }
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  checkToken: PropTypes.func.isRequired,
};

const AppConnector = connect(state => (
  {
    authenticated: state.auth.authenticated,
    token: state.auth.token.data,
  }
), dispatch => (
  {
    checkToken: token => (
      dispatch(checkTokenAction(token))
    ),
  }
))(App);

export default AppConnector;
