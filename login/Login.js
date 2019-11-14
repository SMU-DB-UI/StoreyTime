import React from 'react';
import './login.css';
import Logo from '../../imgs/logo.png';

const Login = props => (
  <div className='login-container'>
    <div className='login-box'>
      <form className='login-form'>
        <div className='login-title'>
          <img className='login-img ' src={Logo} alt='placehold' />
          <h1>Ballot Buddy</h1>
        </div>
        <span className='login-label'>Log In</span>
        <br />
        <br />
        <div className='login-username-wrapper'>
          <span className='glyphicon glyphicon-user icon'></span>
          <input className='login-username' type='text' name='login-username' placeholder='Username' />
        </div>
        <div className='login-password-wrapper'>
          <span className='glyphicon glyphicon-lock icon'></span>
          <input className='login-password' type='password' name='login-password' placeholder='Password' />
        </div>
        <div className='login-button-wrapper'>
          <button type='button' className='btn btn-light'>Login</button>
        </div>
      </form>
      <div className='login-register-wrapper'>
        <p>Dont have an account? Register</p>
        <a href='www.google.com'>Here</a>{/*TODO: Make Link Work*/}
      </div>
    </div>
  </div>
);

export default Login;
