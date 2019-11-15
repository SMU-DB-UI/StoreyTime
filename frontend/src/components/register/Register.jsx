import React, { Component } from 'react';
import './register.css';
import { UserRepo } from '../../api'; 

class Register extends Component {

    userRepo = new UserRepo();

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            state: '',
            user_type: '',
            isRegistered: false
        }
    }

    async onSubmit() {
        var user = {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          state: this.state.state,
          user_type: this.state.user_type
        }

        await this.userRepo.registerUser(user)
            .then(resp => {
                this.setState(pState => {
                    pState.email='';
                    pState.password='';
                    pState.firstName = '';
                    pState.lastName='';
                    pState.state='';
                    pState.user_type='';
                    pState.isRegistered=true;
                    return pState;
                });
            })
            .catch(resp => {
                console.log(resp);
                alert(resp);
            });
    }

    render() {
        return (
            <div className='register-container'>
                <div className='register-box'>
                {this.state.isRegistered && <div className="info">
                        Account successfully created! Please login with your new credentials
                        <a href="/login">Here!</a>
                    </div>
                }
                    <form className='register-form'>
                        <span className='register-label'>Register</span>
                        <div className='register-input-wrapper'>
                            <div className='register-firstname-wrapper'>
                                <span className='glyphicon glyphicon-plus-sign icon'></span>
                                <input 
                                    className='register-firstname' 
                                    type='text' 
                                    name='register-firstname' 
                                    placeholder='First Name'
                                    value={this.state.firstName}
                                    onChange={e => this.setState({ firstName: e.target.value })} 
                                />
                            </div>
                            <div className='register-lastname-wrapper'>
                                <span className='glyphicon glyphicon-plus-sign icon'></span>
                                <input 
                                    className='register-lastname' 
                                    type='text' 
                                    name='register-lastname' 
                                    placeholder='Last Name'
                                    value={this.state.lastName}
                                    onChange={e => this.setState({ lastName: e.target.value })}  
                                />
                            </div>
                            <div className='register-email-wrapper'>
                                <span className='glyphicon glyphicon-plus-sign icon'></span>
                                <input 
                                    className='register-email' 
                                    type='text' 
                                    name='register-email' 
                                    placeholder='Email' 
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })} 
                                />
                            </div>
                            <div className='register-password-wrapper'>
                                <span className='glyphicon glyphicon-plus-sign icon'></span>
                                <input 
                                    className='register-password' 
                                    type='password' 
                                    name='register-password' 
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })} 
                                />
                            </div>
                            <div className='register-state-wrapper'>
                                <span className='glyphicon glyphicon-plus-sign icon'></span>
                                <select 
                                    className='register-state' 
                                    type='state' 
                                    name='register-state' 
                                    placeholder='State' 
                                    value={this.state.state}
                                    onChange={e => this.setState({ state: e.target.value })} 
                                >
                                    <option value='' disabled selected='placeholder'>State</option>
                                    <option value='AL'>AL</option>
                                    <option value='AK'>AK</option>
                                    <option value='AZ'>AZ</option>
                                    <option value='AR'>AR</option>
                                    <option value='CA'>CA</option>
                                    <option value='CO'>CO</option>
                                    <option value='CT'>CT</option>
                                    <option value='DE'>DE</option>
                                    <option value='DC'>DC</option>
                                    <option value='FL'>FL</option>
                                    <option value='GA'>GA</option>
                                    <option value='HI'>HI</option>
                                    <option value='ID'>ID</option>
                                    <option value='IL'>IL</option>
                                    <option value='IN'>IN</option>
                                    <option value='IA'>IA</option>
                                    <option value='KS'>KS</option>
                                    <option value='KY'>KY</option>
                                    <option value='LA'>LA</option>
                                    <option value='ME'>ME</option>
                                    <option value='MD'>MD</option>
                                    <option value='MA'>MA</option>
                                    <option value='MI'>MI</option>
                                    <option value='MN'>MN</option>
                                    <option value='MS'>MS</option>
                                    <option value='MO'>MO</option>
                                    <option value='MT'>MT</option>
                                    <option value='NE'>NE</option>
                                    <option value='NV'>NV</option>
                                    <option value='NH'>New Hampshire</option>
                                    <option value='NJ'>New Jersey</option>
                                    <option value='NM'>New Mexico</option>
                                    <option value='NY'>New York</option>
                                    <option value='NC'>North Carolina</option>
                                    <option value='ND'>North Dakota</option>
                                    <option value='OH'>Ohio</option>
                                    <option value='OK'>Oklahoma</option>
                                    <option value='OR'>Oregon</option>
                                    <option value='PA'>Pennsylvania</option>
                                    <option value='RI'>Rhode Island</option>
                                    <option value='SC'>South Carolina</option>
                                    <option value='SD'>South Dakota</option>
                                    <option value='TN'>Tennessee</option>
                                    <option value='TX'>Texas</option>
                                    <option value='UT'>Utah</option>
                                    <option value='VT'>Vermont</option>
                                    <option value='VA'>Virginia</option>
                                    <option value='WA'>Washington</option>
                                    <option value='WV'>West Virginia</option>
                                    <option value='WI'>Wisconsin</option>
                                    <option value='WY'>Wyoming</option>
                                </select>
                            </div>
                        </div>
                        <div className='register-button-wrapper'>
                            <button 
                                type='button' 
                                className='btn btn-light'
                                onClick={e => {e.preventDefault(); this.onSubmit();}}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}

export default Register;