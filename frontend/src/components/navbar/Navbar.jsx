import React from 'react';
import Logo from '../../imgs/logo.png';
import './navbar.css';
import { NavLink } from 'react-router-dom'

const Navbar = props => (
    <header className='nav-container'>
        <div className='nav-left'>
            <img src={Logo} alt='' />
            <ul className='nav-links'>
                <li><h3><a href="https://vote.gov/">Candidates</a></h3></li>
                <li><h3><a href="https://vote.gov/">Polls</a></h3></li>
                <li><h3><a href="https://vote.gov/">Voter Registration</a></h3></li>
            </ul>
        </div>
        <div className='nav-right'>
            <h3><NavLink to="/login" onClick={() => {localStorage.clear()}}>Log out</NavLink></h3>
            <button><h3>Profile</h3></button>
        </div>
    </header>
);

export default Navbar;