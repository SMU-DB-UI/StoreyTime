import React, { Component } from 'react';
import './candidates.css';
import Navbar from '../navbar/Navbar';
import { CandidateRepo } from '../../api/candidateRepo';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            candidates: [],
            search: ''
        };
        this.candidateRepo = new CandidateRepo();
    }

    filter() {
        console.log('here');
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
                                            <form className="form-inline candidates-top">
                                                <input className="form-control mr-sm-3 mb-sm-0 mb-2" 
                                                    type="text" 
                                                    placeholder="Search candidates"
                                                    aria-label="Search"
                                                    value={this.state.search} 
                                                    onChange={e => { this.setState({ search: e.target.value }); this.filter(); }}
                                                />
                                            </form>
                                            <br/>
                                            <div>
                                                {this.state.candidates.map(candidate => 
                                                    <div key={candidate.id}>   
                                                        DO THIS
                                                    </div>
                                                )}
                                            </div>
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

    componentDidMount() {
        this.candidateRepo.getCandidates()
        .then(resp => this.setState({ candidates: resp }))
        .catch(resp => alert(resp));
    }
    
}
 
export default Candidates;