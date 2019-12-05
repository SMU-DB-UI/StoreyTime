import React, { Component } from 'react';
import './candidates.css';
import Navbar from '../navbar/Navbar';
import { CandidateRepo } from '../../api/candidateRepo';

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [
                {
                    id: 1,
                    name: 'John Doe',
                    officePhone: '1-800-555-9000',
                    officeEmail: 'johndoe@politics.gov',
                    candidateType: 'Senator',
                    state: 'TX'
                },
                {
                    id: 2,
                    name: 'Jane Doe',
                    officePhone: '1-800-555-6000',
                    officeEmail: 'janedoe@politics.gov',
                    candidateType: 'Congresswoman',
                    state: 'TX'
                }
            ]
        };
        this.filteredCandidates = [];
        this.candidateRepo = new CandidateRepo();
    }

    filter() {
        console.log('here');
    }

    componentWillMount() {
        this.filteredCandidates = this.state.candidates;
    }

    componentWillUpdate() {
        console.log(this.state.candidates)
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
                                                    onChange={e => {
                                                        var val = e.target.value;
                                                        this.filteredCandidates = this.state.candidates.filter(x =>
                                                            x.name.toUpperCase().indexOf(val.toUpperCase()) > -1
                                                        );
                                                        console.log(this.filteredCandidates);
                                                        this.forceUpdate();
                                                    }}
                                                />
                                            </form>
                                            <br />
                                            <div>
                                                {
                                                    this.filteredCandidates.map(candidate =>
                                                        <div className="card" key={candidate.id}>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-6 text-left">
                                                                        <p>{candidate.name}</p>
                                                                        <p className="text-muted">{candidate.candidateType} - {candidate.state}</p>
                                                                    </div>
                                                                    <div className="col-6 text-right">
                                                                        <p>{candidate.officeEmail}</p>
                                                                        <p className="text-muted">{candidate.officePhone}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
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

    componentDidUpdate() {
        console.log(this.state.candidates)
    }

    componentDidMount() {
        // this.candidateRepo.getCandidates()
        //     .then(resp => this.setState({ candidates: resp }))
        //     .catch(resp => alert(resp));
        console.log(this.state.candidates.length)
    }

}

export default Candidates;