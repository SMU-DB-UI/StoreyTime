import React from 'react';
import Logo from '../../imgs/logo.png';
import './navbar.css';

const Navbar = props => (
    <header className='nav-container'>
        <div className='nav-left'>
            <img src={Logo} alt='' />
            <ul className='nav-links'>
                <li><h3>Candidates</h3></li>
                <li><h3>Polls</h3></li>
                <li><h3>Voter Registration</h3></li>
            </ul>
        </div>
        <div className='nav-right'>
            <span>Log out</span>
            <button>Profile</button>
        </div>
    </header>
);

export default Navbar;