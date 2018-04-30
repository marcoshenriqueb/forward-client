import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './login.styl';
import actions from './../../store/actions';

const { login: loginAction } = actions;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    this.setState({
      error: '',
    });
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    }).then((data) => {
      if (data.code.toString().startsWith('4')) {
        this.setState({
          error: 'Credenciais inválidas',
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="login-container d-flex flex-column align-items-center justify-content-center">
        <h1>Forward</h1>
        <form className="login-form">
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={this.state.email}
            onInput={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Senha"
            value={this.state.password}
            onInput={e => this.setState({ password: e.target.value })}
          />
          <button
            type="submit"
            className="btn btn-block btn-primary mb-2"
            onClick={this.onLogin}
          >
            Entrar
          </button>
          {
            this.state.error ?
              <div className="alert alert-danger">
                {this.state.error}
              </div> : null
          }
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const LoginConnector = connect(() => (
  {

  }
), dispatch => (
  {
    login: credentials => (
      dispatch(loginAction(credentials))
    ),
  }
))(Login);

export default LoginConnector;
