import React, { Component } from 'react';
import './profile.css';
import { UserRepo } from '../../api';
import { NavLink, Redirect } from 'react-router-dom';
import Navbar from '../navbar/Navbar';


class Profile extends Component {

    userRepo = new UserRepo();

    constructor(props) {
        super(props);

        this.tags = [
            "Republican",
            "Conservative",
            'Democrat',
            'Liberal',
            "Immigration",
            'Abortion',
            'Climate Change',
            'Gun Control',
            'Unemployment',
            'Education',
            'Religion',
            'Drug Policy',
            'Patriot Act',
            'Net Neutrality',
            'Equal Pay',
            'Taxes',
            'Welfare',
            'Medicaid',
            'Vaccinationas',
            'Terrorism',
            'Racism'
        ]

        this.state = {
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            email: localStorage.getItem('email'),
            pass: 'xxxxxxxx',
            state: localStorage.getItem('state'),
            user_type: localStorage.getItem('user_type'),
            edit: false,
            followedTags: []
        }
    }

    async handleSubmit() {
        this.setState({ edit: false });
        if (this.state.firstName !== localStorage.getItem('firstName')){
            await this.userRepo.changeFirstName(this.state.firstName)
                .then(resp => {
                    localStorage.setItem('firstName', this.state.firstName);
                })
                .catch(resp => {
                    this.setState({ firstName: localStorage.getItem('firstName') });
                });
        }

        if (this.state.lastName !== localStorage.getItem('lastName')){
            await this.userRepo.changeLastName(this.state.lastName)
                .then(resp => {
                    localStorage.setItem('lastName', this.state.lastName);
                })
                .catch(resp => {
                    this.setState({ lastName: localStorage.getItem('lastName') });
                });
        }

        if (this.state.email !== localStorage.getItem('email')){
            await this.userRepo.changeEmail(this.state.email)
                .then(resp => {
                    localStorage.setItem('email', this.state.email);
                })
                .catch(resp => {
                    this.setState({ email: localStorage.getItem('email') });
                });
        }

        if(this.state.pass !== 'xxxxxxxx'){
            await this.userRepo.changePassword(this.state.pass)
                .then()
                .catch(resp => {
                    console.log(resp);
                });
        }
        
        if(this.state.state !== localStorage.getItem('state')){
            await this.userRepo.changeState(this.state.state)
                .then(resp => {
                    localStorage.setItem('state', this.state.state);
                })
                .catch(resp => {
                    this.setState({ state: localStorage.getItem('state') });
                });
        }
    }

    handleTagChange() {

    }

    render() {
        if (!localStorage.getItem('id')){
            return <Redirect to="/login" />
        }
        return (
            <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-box container" id="profile-box">
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
                                value={this.state.pass}
                                onChange={e => this.setState({ pass: e.target.value })}
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
                        {this.state.edit === false &&
                            <button
                                type="button"
                                className="btn btn-light edit-button"
                                onClick={() => { this.setState({ edit: true }) }}
                            >Edit</button>
                        }
                        {this.state.edit === true &&
                            <button
                                type="button"
                                className="btn btn-light edit-button"
                                onClick={(e) => { e.preventDefault();  this.handleSubmit(); }}
                            >Submit</button>
                        }
                        <NavLink to='/home' className="btn btn-light">Done</NavLink>
                    </div>
                </div>
                <div className="tag-selector">
                    <h2>Select Tags to follow</h2>
                    <div className="checkbox-container">
                        {
                            this.tags.map(tag => 
                                <div className="form-check form-check-inline" key={tag}>
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        id={tag} 
                                        value={tag} 
                                        onChange={e => {
                                            var val = console.log(e.target.checked);
                                            if(!this.state.followedTags.includes(val)){
                                                this.setState(pstate => { return pstate.followedTags.push(val) });
                                            }else{
                                                this.setState(pstate => {
                                                    pstate.followedTags.splice(pstate.followedTags.indexOf(val), 1);
                                                    return pstate;
                                                });
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" 
                                        htmlFor={tag}
                                        value={tag} 
                                        onChange={e => {
                                            // var val = console.log(tag);
                                            if(!this.state.followedTags.includes(tag)){
                                                this.setState(pstate => { return pstate.followedTags.push(tag) });
                                            }else{
                                                this.setState(pstate => {
                                                    pstate.followedTags.splice(pstate.followedTags.indexOf(tag), 1);
                                                    return pstate;
                                                });
                                            }
                                        }}
                                    >{tag}</label>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Profile;