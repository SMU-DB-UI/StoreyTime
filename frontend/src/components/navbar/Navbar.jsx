import React from 'react';
// import Logo from '../../imgs/logo.png';
import './navbar.css';
import { NavLink } from 'react-router-dom'

const Navbar = props => (
    <nav className='navbar navbar-expand navbar-dark' id="navbar">
    {/* <nav className='navbar navbar-expand-md navbar-dark' id="navbar"> */}
        <NavLink to="/" className="navbar-brand">BallotBuddy</NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ballotBuddyNav"
            aria-controls="ballotBuddyNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* <div className="collapse navbar-collapse" id="ballotBuddyNav"> */}
        <div className="collapse navbar-collapse" id="ballotBuddyNav">

            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="nav-link" href="https://vote.gov/">Voter Registration</a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link" onClick={() => { localStorage.clear() }}>Log out</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">Profile</NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;