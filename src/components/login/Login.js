import React, { Component } from 'react';
import axios from 'axios';
import './login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  render(){
    return (
      <div className="container-login">
        <div className="div-login">
          <form className="login-form">
            <span className="login-img">
              <img src="https://placehold.it/150x150" alt="placehold"/>
            </span>
            <span className="login-title">Log In</span>
            <br/>
            <br/>
            <div className="username-wrapper">
              <span className="glyphicon glyphicon-user icon"></span> 
              <input className="username" type="text" name="username" placeholder="Username"/>
            </div>
            <div className="password-wrapper">
              <span className="glyphicon glyphicon-lock icon"></span> 
              <input className="password" type="password" name="password" placeholder="Password"/>
            </div>
            <div className="button-wrapper">
              <button type="button" className="btn btn-light">Login</button>
            </div>
          </form>
          <div className="register-wrapper">
            <p>Dont have an account? Register</p> 
            <a href="#">Here</a>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
