import React, { Component } from 'react';
import Logo from '../../imgs/logo.png';
import './navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <header className="App-header">
                <div className="head">
                    <div className="left">
                        <img src={Logo} />
                        <ul className="links">
                            <li>Candidates</li>
                            <li>Polls</li>
                            <li>Voter Registration</li>
                        </ul>
                    </div>
                    <div className="right">
                        <span>Log out</span>
                        <button>Profile</button>
                    </div>
                </div>
            </header>
        );
    }
}

export default Navbar;