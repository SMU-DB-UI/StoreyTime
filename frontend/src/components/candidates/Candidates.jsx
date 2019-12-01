import React, { Component } from 'react';
import './candidates.css';
import Navbar from '../navbar/Navbar';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <>
                <Navbar />
                <div className="containder">
                    Candidates
                </div>
            </>
        );
    }

    componentDidMount() {
        
    }
    
}
 
export default Candidates;