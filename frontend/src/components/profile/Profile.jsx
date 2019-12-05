import React, { Component } from 'react';
import './profile.css';
import { UserRepo, CandidateRepo } from '../../api';
import { NavLink, Redirect } from 'react-router-dom';
import Navbar from '../navbar/Navbar';


class Profile extends Component {

    userRepo = new UserRepo();
    candidateRepo = new CandidateRepo();

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
            'Vaccinations',
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
            followedTags: [],
            isCandidate: false,
            officePhone: localStorage.getItem('officePhone'),
            officeEmail: localStorage.getItem('officeEmail'),
            candidateType: localStorage.getItem('candidateType')
        }
    }

    async handleSubmit() {
        this.setState({ edit: false });
        if (this.state.firstName !== localStorage.getItem('firstName')) {
            await this.userRepo.changeFirstName(this.state.firstName)
            .then(() => localStorage.setItem('firstName', this.state.firstName))
            .catch(() => this.setState({ firstName: localStorage.getItem('firstName') }));
        }

        if (this.state.lastName !== localStorage.getItem('lastName')) {
            await this.userRepo.changeLastName(this.state.lastName)
            .then(() => localStorage.setItem('lastName', this.state.lastName))
            .catch(() => this.setState({ lastName: localStorage.getItem('lastName') }));
        }

        if (this.state.email !== localStorage.getItem('email')) {
            await this.userRepo.changeEmail(this.state.email)
            .then(() => localStorage.setItem('email', this.state.email))
            .catch(() => this.setState({ email: localStorage.getItem('email') }));
        }

        if (this.state.pass !== 'xxxxxxxx') {
            await this.userRepo.changePassword(this.state.pass)
            .then()
            .catch(resp => console.log(resp));
        }

        if(localStorage.getItem('user_type') === '1'){
            if (this.state.state !== localStorage.getItem('state')) {
                await this.userRepo.changeState(this.state.state)
                .then(() => localStorage.setItem('state', this.state.state))
                .catch(() => this.setState({ state: localStorage.getItem('state') }));
            }

            if(this.state.officeEmail !== localStorage.getItem('officeEmail')) {
                await this.candidateRepo.changeOfficeEmail(this.state.officeEmail)
                .then(() => localStorage.setItem('officeEmail', this.state.officeEmail))
                .catch(() => this.setState({ officeEmail: localStorage.getItem('officeEmail') }));
            }

            if(this.state.officePhone !== localStorage.getItem('officePhone')) {
                await this.candidateRepo.changeOfficePhone(this.state.officePhone)
                .then(() => localStorage.setItem('officePhone', this.state.officePhone))
                .catch(() => this.setState({ officePhone: localStorage.getItem('officePhone') }));
            }

            if(this.state.candidateType !== localStorage.getItem('candidateType')) {
                await this.candidateRepo.changeCandidateType(this.state.candidateType)
                .then(() => localStorage.setItem('candidateType', this.state.candidateType))
                .catch(() => this.setState({ candidateType: localStorage.getItem('candidateType') }));
            }
        }
    }

    componentDidMount() {
        this.userRepo.getFollowedTags()
        .then(res => {
            console.log(res.res);
            res.res.forEach(word => {
                this.setState(prevstate => { 
                    prevstate.followedTags.push(word.tag_word);
                    return prevstate;
                });
            });
        })
        .catch(res => alert(res));
    }
    

    render() {
        if (!localStorage.getItem('id')) {
            return <Redirect to="/login" />
        }
        return (
            <>
                <Navbar />
                <br />
                <div className='profile-container'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <h1>User Profile</h1>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
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
                                                </div>
                                                <div className="row">
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
                                                </div>
                                                <div className="row">
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
                                                </div>
                                                <div className="row">
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
                                                </div>
                                                <div className="row">
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
                                                </div>
                                                {localStorage.getItem('user_type') === '1' &&
                                                    <>
                                                        <div className="row">
                                                            <div className="col-12 text-left">
                                                                <div className="form-group">
                                                                    <label htmlFor="profile-officePhone">Office Phone</label>
                                                                    <input
                                                                        disabled={!this.state.edit}
                                                                        className='profile-officePhone form-control'
                                                                        type='text'
                                                                        name='profile-officePhone'
                                                                        value={this.state.officePhone}
                                                                        onChange={e => this.setState({ officePhone: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 text-left">
                                                                <div className="form-group">
                                                                    <label htmlFor="profile-officeEmail">Office Email</label>
                                                                    <input
                                                                        disabled={!this.state.edit}
                                                                        className='profile-officeEmail form-control'
                                                                        type='text'
                                                                        name='profile-officeEmail'
                                                                        value={this.state.officeEmail}
                                                                        onChange={e => this.setState({ officeEmail: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 text-left">
                                                                <div className="form-group">
                                                                    <label htmlFor="profile-candidateTitle">Candidate Title</label>
                                                                    <input
                                                                        disabled={!this.state.edit}
                                                                        className='profile-candidateTitle form-control'
                                                                        type='text'
                                                                        name='profile-candidateTitle'
                                                                        value={this.state.candidateType}
                                                                        onChange={e => this.setState({ candidateType: e.target.value })}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                <div className="row">
                                                    <div className="col-12 text-left">
                                                        <label htmlFor="profile-tags">Tags I'm Following</label>
                                                        <div className="form-group">
                                                            <div className="row profile-tags">
                                                                {
                                                                    this.tags.map(tag =>
                                                                        <div className="col-md-4 col-sm-6" key={tag}>
                                                                            <div className="custom-control custom-checkbox mb-1" key={tag}>
                                                                                <input disabled={!this.state.edit}
                                                                                    className="custom-control-input"
                                                                                    type="checkbox"
                                                                                    id={tag}
                                                                                    value={tag}
                                                                                    checked={this.state.followedTags.includes(tag.toLowerCase())}
                                                                                    onClick={e => {
                                                                                        e.persist();
                                                                                        console.log(e.target.checked);
                                                                                        if(!e.target.checked){
                                                                                            this.setState(pstate => { pstate.followedTags.splice(pstate.followedTags.indexOf(tag.toLowerCase()), 1); return pstate; });
                                                                                            this.userRepo.unfollowTag(tag.toLowerCase()).then().catch();
                                                                                        }else{
                                                                                            this.setState(pstate => { pstate.followedTags.push(tag); return pstate; });
                                                                                            this.userRepo.followTag(tag.toLowerCase()).then(() => e.target.checked = true).catch();
                                                                                            // e.target.checked = true;
                                                                                        }
                                                                                    }}
                                                                                    
                                                                                />
                                                                                <label className="custom-control-label"
                                                                                    htmlFor={tag}
                                                                                    value={tag}
                                                                                    onChange={e => {
                                                                                        // this.handleFollow(e);
                                                                                        // var val = console.log(tag);
                                                                                        // if (!this.state.followedTags.includes(tag)) {
                                                                                        //     this.setState(pstate => { return pstate.followedTags.push(tag) });
                                                                                        // } else {
                                                                                        //     this.setState(pstate => {
                                                                                        //         pstate.followedTags.splice(pstate.followedTags.indexOf(tag), 1);
                                                                                        //         return pstate;
                                                                                        //     });
                                                                                        // }
                                                                                    }}
                                                                                >{tag}</label>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6 mb-sm-0 mb-3">
                                                        {this.state.edit === false &&
                                                            <button
                                                                type="button"
                                                                className="form-control edit-button"
                                                                onClick={() => { this.setState({ edit: true }) }}
                                                            >Edit</button>
                                                        }
                                                        {this.state.edit === true &&
                                                            <button
                                                                type="button"
                                                                className="form-control edit-button"
                                                                onClick={(e) => { this.handleSubmit(); window.location.reload(false); }}
                                                            >Submit</button>
                                                        }
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <NavLink to='/home' className="form-control">Done</NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </>
        )
    }
}

export default Profile;