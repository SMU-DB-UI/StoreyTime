import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import './groupHome.css';

class GroupHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (  
            <>
                <Navbar />
                <div className="container">
                    Groups
                </div>
            </>
        );
    }

    componentDidMount() {
        
    }
    
}
 
export default GroupHomepage;