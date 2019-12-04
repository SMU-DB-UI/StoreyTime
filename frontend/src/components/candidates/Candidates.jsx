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
                    firstName: 'John',
                    lastName: 'Doe',
                    officePhone: '1-800-555-9000',
                    officeEmail: 'johndoe@politics.gov',
                    candidateType: 'Senator',
                    state: 'TX'
                },
                {
                    id: 2,
                    firstName: 'Jane',
                    lastName: 'Doe',
                    officePhone: '1-800-555-6000',
                    officeEmail: 'janedoe@politics.gov',
                    candidateType: 'Congresswoman',
                    state: 'TX'
                }
            ],
            search: ''
        };
        this.candidateRepo = new CandidateRepo();
    }

    filter() {
        console.log('here');
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
                                                <input className="form-control mr-sm-3 mb-sm-0 mb-2"
                                                    type="text"
                                                    placeholder="Search candidates"
                                                    aria-label="Search"
                                                    value={this.state.search}
                                                    onChange={e => { this.setState({ search: e.target.value }); this.filter(); }}
                                                />
                                            </form>
                                            <br />
                                            <div>
                                                {
                                                    this.state.candidates.map(candidate =>
                                                        <div className="card" onClickkey={candidate.id}>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-6 text-left">
                                                                        <p>{candidate.firstName} {candidate.lastName}</p>
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