import React from 'react';
import Navbar from '../navbar/Navbar'
import PostCard from '../postCard/PostCard'
import PollCard from '../pollCard/PollCard'
import './home.css';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {

    state = {
        feed: [
            {
                id: 0,
                tags: ['Guns', 'School', 'Children'],
                title: 'Give All Children Guns',
                text: 'Just like we teach them reading and writing, necessary skills. We would teach shooting and firearm competency. It wouldn’t matter if a child’s parents weren’t good at it. We’d find them a mentor. It wouldn’t matter if they didn’t want to learn. We would make it necessary to advance to the next grade.',
                user: 'Hayden Center',
                userId: 0,
                date: '11/21/2019',
                dateTime: new Date(),
                isPoll: false
            },
            {
                id: 1,
                tags: ['Parties', 'President', 'Alignment'],
                question: 'Democrat or Republican?',
                answers: ['Democrat', 'Republican', 'Other'],
                votes: [42, 40, 18],
                totalVotes: 100, //find a way to compute this before putting in
                user: 'Hayden Center',
                userId: 0,
                date: '11/21/2019',
                dateTime: new Date(),
                isPoll: true
            }
        ]
    }

    render() {
        if (!localStorage.getItem('id')){
            return <Redirect to="/login" />
        }
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
                                            <form className="form-inline feed-top">
                                                <input className="form-control" type="text" placeholder="Search"
                                                    aria-label="Search" />
                                                <button type="button" class="btn" data-toggle="modal" data-target="#postModal">
                                                    New Post
                                                </button>
                                                <button type="button" class="btn" data-toggle="modal" data-target="#pollModal">
                                                    New Post
                                                </button>

                                                <div class="modal fade" id="postModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered" role="document">
                                                    <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLongTitle">New Post</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        TODO: POST BODY
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary">Submit Post</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>

                                                <div class="modal fade" id="pollModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered" role="document">
                                                    <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLongTitle">New Poll</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        TODO: POLL BODY
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary">Submit Poll</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    {this.state.feed.map(feed =>
                                        <div className="post-item" key={feed.id}><br />
                                            <div className="row">
                                                <div className="col-12">
                                                    {feed.isPoll === false && (<PostCard post={feed} key={feed.post_id} />)}
                                                    {feed.isPoll === true && (<PollCard poll={feed} key={feed.post_id} />)}
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
            <br />
        </>);
    }

    componentDidMount() {
        
    }
}

export default Home;