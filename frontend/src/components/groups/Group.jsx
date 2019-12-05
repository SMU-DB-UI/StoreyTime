import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import { GroupRepo } from '../../api/groupRepo';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.group_id,
            name: '',
            members: []
        }
        this.groupRepo = new GroupRepo();
    }

    render() {
        return (
            <>
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
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h1>{this.state.name}</h1>
                                                        <button className="btn btn-large" 
                                                        type="button"
                                                        onClick={e => {this.groupRepo.joinGroup(this.state.id, localStorage.getItem('id')).then().catch(); window.location.reload()}}
                                                        >Join group</button>
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="row">
                                                    <div className="col-12">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr className="text-left">
                                                                    <th scope="col"><p>&nbsp; Members</p></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.members.length > 0 && this.state.members.map(member => 
                                                                    <tr className="text-left">
                                                                        <td><p>&nbsp; {member}</p></td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    componentDidMount() {
        this.groupRepo.getAllMembers(this.state.id)
        .then(resp => this.setState({ members: resp}))
        .catch();
    }
}
export default Group;