import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom'

const Navbar = props => (
    <nav className='navbar navbar-expand-md navbar-dark' id="navbar">
        <NavLink to="/home" className="navbar-brand">BallotBuddy</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ballotBuddyNav" aria-controls="ballotBuddyNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="ballotBuddyNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="https://vote.gov/" className="nav-link">Voter Registration</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/groups" className="nav-link" activeClassName="nav-link border border-white rounded-pill rounded-sm">Groups</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/candidates" className="nav-link" activeClassName="nav-link border border-white rounded-pill rounded-sm">Candidates</NavLink>   
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link" onClick={() => { localStorage.clear() }}>Log out</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/profile" className="nav-link" activeClassName="nav-link border border-white rounded-pill rounded-sm">Profile</NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;