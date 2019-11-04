import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <header className="App-header">
                <div className="head">
                    <div className="left">
                        <h1 className="name">Ballot Buddy</h1>
                        <ul className="links">
                            <li>Candidates</li>
                            <li>Polls</li>
                            <li>Voter Registration</li>
                        </ul>
                    </div>
                <div className="right">
                    <span>Log out</span>
                    <span>Profile</span>
                </div>
                <div className="clear"></div></div>
            </header>
         );
    }
}
 
export default Navbar;