import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import './groupHome.css';
import { GroupRepo } from '../../api/groupRepo';

class GroupHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [
                
            ],
            search: '',
            groupname: ''
        }
        this.groupRepo = new GroupRepo;
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
                                            <form className="form-inline groups-top">
                                                <input className="form-control mb-2"
                                                    type="text"
                                                    placeholder="Search groups"
                                                    aria-label="Search"
                                                    value={this.state.search}
                                                    onChange={e => this.setState({ search: e.target.value })}
                                                />
                                                <button type="button" className="form-control btn" data-toggle="modal" data-target="#groupModal">
                                                    Create Group
                                                </button>
                                            </form>

                                            <div className="modal fade" id="groupModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">New Post</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body text-left">
                                                            <form className="group-modal">
                                                                <label htmlFor="group-name" className="text-left">Name</label>
                                                                <div className="form-group">
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="group-name"
                                                                        placeholder="Group name"
                                                                        value={this.state.groupname}
                                                                        onChange={e => this.setState({ groupname: e.target.value })}
                                                                    />
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.createGroup(); }}>Create Group</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <br />
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr className="text-left">
                                                        <th scope="col"><p>&nbsp; Group Name</p></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.groups.map(group =>
                                                        <tr key={group.id}>
                                                            <td className="text-left">
                                                                <p><a href={"/group/" + group.id}>&nbsp; {group.name}</a></p>
                                                            </td>
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
        </>);
    }
    componentDidMount() {
        this.groupRepo.getAllGroups()
        .then(res => this.setState({ groups: res}))
        .catch();
    }

    createGroup() {
        this.groupRepo.createGroup(this.state.groupname)
        .then(() => window.location.reload())
        .catch();
    }
}
export default GroupHomepage;