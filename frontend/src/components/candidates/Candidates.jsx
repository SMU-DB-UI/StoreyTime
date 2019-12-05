import React, { Component } from 'react';
import './candidates.css';
import Navbar from '../navbar/Navbar';
import { CandidateRepo } from '../../api/candidateRepo';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [ ],
            search: ''
        };
        this.candidateRepo = new CandidateRepo();
    }

    filter() {
        console.log('here');
    }

    componentWillMount() {
        this.filteredCandidates = this.state.candidates;
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
                                                <input className="form-control mb-2"
                                                    type="text"
                                                    placeholder="Search candidates"
                                                    aria-label="Search"
                                                    value={this.state.search}
                                                    onChange={e => this.setState({ search: e.target.value })}
                                                />
                                            </form>
                                            <br />
                                            <div>
                                                {
                                                    (this.state.search === "" ?
                                                        this.state.candidates.map(candidate =>
                                                            <div className="card" key={candidate.id}>
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-6 text-left">
                                                                            <p>{candidate.firstName + " " + candidate.lastName}</p>
                                                                            <p className="text-muted">{candidate.politician_type} - {candidate.state_residence}</p>
                                                                        </div>
                                                                        <div className="col-6 text-right">
                                                                            <p>{candidate.office_email}</p>
                                                                            <p className="text-muted">{candidate.office_phone}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) 
                                                        :
                                                        this.state.candidates.filter(candidate =>
                                                            ((candidate.firstName+" "+candidate.lastName).toLowerCase().includes(this.state.search.toLowerCase()) 
                                                            || candidate.state_residence.toLowerCase().includes(this.state.search.toLowerCase())
                                                            || candidate.politician_type.toLowerCase().includes(this.state.search.toLowerCase())
                                                            || candidate.office_email.toLowerCase().includes(this.state.search.toLowerCase())
                                                            || candidate.office_phone.toLowerCase().includes(this.state.search.toLowerCase())) 
                                                            &&
                                                            <div className="card" key={candidate.id}>
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-6 text-left">
                                                                            <p>{candidate.firstName + " " + candidate.lastName}</p>
                                                                            <p className="text-muted">{candidate.politician_type} - {candidate.state_residence}</p>
                                                                        </div>
                                                                        <div className="col-6 text-right">
                                                                            <p>{candidate.office_email}</p>
                                                                            <p className="text-muted">{candidate.office_phone}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) 
                                                    )


                                                }
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
        .then(res => this.setState({ candidates: res }))
        .catch();

        this.filteredCandidates = this.state.candidates;
    }
}
export default Candidates;
