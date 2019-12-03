import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';

class CandidatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (<>
            <Navbar />
            <br />
            <div className='home-container'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card feed">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
}
 
export default CandidatePage;