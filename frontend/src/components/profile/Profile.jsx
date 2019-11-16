import React, { Component } from 'react';
import './profile.css';
import { UserRepo } from '../../api';
import { NavLink } from 'react-router-dom'


class Profile extends Component {

    constructor(props) {
        //TODO: make state pull from database/localstorage and update eveything when done is clicked
        super(props);
        this.state = {
            firstName: 'Hayden',
            lastName: 'Center',
            email: 'haydencenter72@gmail.com',
            password: 'boberto11',
            state: 'CA',
            user_type: 0,
            edit: false
        }
    }

    render() {
        return (
            <div className="profile-container">
                <div className="profile-box container">
                    <h1>User Profile</h1>
                    <div className="col-12 text-left">
                        <label htmlFor="profile-firstname">First Name</label>
                        <input
                            disabled={!this.state.edit}
                            className='profile-firstname form-control'
                            type='text'
                            name='profile-firstname'
                            value={this.state.firstName}
                            onChange={e => this.setState({ firstName: e.target.value })}
                        />
                        <br />
                    </div>
                    <div className="col-12 text-left">
                        <label htmlFor="profile-lastname">Last Name</label>
                        <input
                            disabled={!this.state.edit}
                            className='profile-lastname form-control'
                            type='text'
                            name='profile-lastname'
                            value={this.state.lastName}
                            onChange={e => this.setState({ lastName: e.target.value })}
                        />
                        <br />
                    </div>
                    <div className="col-12 text-left">
                        <label htmlFor="profile-email">Email</label>
                        <input
                            disabled={!this.state.edit}
                            className='profile-email form-control'
                            type='text'
                            name='profile-email'
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                        <br />
                    </div>
                    <div className="col-12 text-left">
                        <div className="form-group">
                            <label htmlFor="profile-password">Password</label>
                            <input
                                disabled={!this.state.edit}
                                className='profile-password form-control'
                                type='password'
                                name='profile-password'
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="col-12 text-left">
                        <div className="form-group">
                            <label htmlFor="profile-state">State</label>
                            <select
                                disabled={!this.state.edit}
                                className='profile-state form-control'
                                type='password'
                                name='profile-state'
                                value={this.state.state}
                                onChange={e => this.setState({ state: e.target.value })}
                            >
                                <option value='' disabled>State</option>
                                <option value='AL'>Alabama</option>
                                <option value='AK'>Alaska</option>
                                <option value='AZ'>Arizona</option>
                                <option value='AR'>Arkansas</option>
                                <option value='CA'>California</option>
                                <option value='CO'>Colorado</option>
                                <option value='CT'>Connecticut</option>
                                <option value='DE'>Delaware</option>
                                <option value='DC'>Washington, D.C.</option>
                                <option value='FL'>Florida</option>
                                <option value='GA'>Georgia</option>
                                <option value='HI'>Hawaii</option>
                                <option value='ID'>Idaho</option>
                                <option value='IL'>Illinois</option>
                                <option value='IN'>Indiana</option>
                                <option value='IA'>Iowa</option>
                                <option value='KS'>Kansas</option>
                                <option value='KY'>Kentucky</option>
                                <option value='LA'>Louisiana</option>
                                <option value='ME'>Maine</option>
                                <option value='MD'>Maryland</option>
                                <option value='MA'>Massachusetts</option>
                                <option value='MI'>Michigan</option>
                                <option value='MN'>Minnesota</option>
                                <option value='MS'>Mississippi</option>
                                <option value='MO'>Missouri</option>
                                <option value='MT'>Montana</option>
                                <option value='NE'>Nebraska</option>
                                <option value='NV'>Nevada</option>
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
                    <div className="col-12">
                        {this.state.edit == false &&
                            <button
                                type="button"
                                className="btn btn-light edit-button"
                                onClick={() => { this.setState({ edit: true }) }}
                            >Edit</button>
                        }
                        {this.state.edit == true &&
                            <button
                                type="button"
                                className="btn btn-light edit-button"
                                onClick={() => { this.setState({ edit: false }) }}
                            >Done</button>
                        }
                        <NavLink to='/home' className="btn btn-light">Done</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;