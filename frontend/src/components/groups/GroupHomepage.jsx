import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import './groupHome.css';

class GroupHomepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [
                {
                    name: 'The Troop Haters',
                    id: 1
                },
                {
                    name: 'The Troop Haters Haters',
                    id: 2
                }
            ],
            search: ''
        }
        this.filteredGroups = [];
    }

    componentWillMount() {
        this.filteredGroups = this.state.groups;
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
                                                    onChange={e => {
                                                        var val = e.target.value;
                                                        this.filteredGroups = this.state.groups.filter(x =>
                                                            x.name.toUpperCase().indexOf(val.toUpperCase()) > -1
                                                        );
                                                        console.log(this.filteredGroups);
                                                        this.forceUpdate();
                                                    }}
                                                />
                                            </form>
                                            <br />
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr className="text-left">
                                                        <th scope="col"><p>&nbsp; Group Name</p></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.filteredGroups.map(group =>
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

    }

}

export default GroupHomepage;