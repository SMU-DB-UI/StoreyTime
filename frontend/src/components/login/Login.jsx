import React from 'react';
import './login.css';
import Logo from '../../imgs/logo.png';
import { UserRepo } from '../../api';
import { Redirect, NavLink } from 'react-router-dom';

class Login extends React.Component {

  userRepo = new UserRepo();

  state = {
    email: '',
    password: '',
    showError: false,
    redirect: ''
  };

  onSubmit() {
    let user = {
      email: this.state.email,
      pass: this.state.password
    }

    this.userRepo.userLogin(user)
      .then(() => {
        if (localStorage.getItem('code') === '200') {
          this.setState({ redirect: '/home' })
        } else {
          this.setState({ showError: true })
        }
      })
      .catch(resp => {
        console.log(resp);
        this.setState({ showError: true });
      });

    this.setState(pState => {
      pState.email = '';
      pState.password = '';
      return pState;
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />
    }
    return (
      <div className='login-container'>
        <div className='login-box container' id="login-box">
          <form className='login-form'>
            {this.state.showError && <div className="danger">Error while logging in.</div>}
            <div className="spacer"></div>
            <img className='login-img' src={Logo} alt='placeholder' ></img>
            <h1 className='login-label'>Log In</h1>
            <div className="spacer"></div>
            <div className='login-username-wrapper'>
              <i className="fas fa-plus-square"></i>
              <input
                className='login-username'
                type='text'
                name='login-username'
                placeholder='Email'
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="spacer"></div>
            <div className='login-password-wrapper'>
              <i className="fas fa-plus-square"></i>
              <span className='glyphicon glyphicon-lock icon'></span>
              <input
                className='login-password'
                type='password'
                name='login-password'
                placeholder='Password'
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="spacer"></div>
            <div className='login-button-wrapper'>
              <button
                type='button'
                className='btn btn-light'
                onClick={e => {
                  e.preventDefault();
                  this.onSubmit();
                }}
              >
                Login
              </button>
            </div>
            <div className='login-register-wrapper'>
            <p>Dont have an account? Register <NavLink to="/register">here!</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
