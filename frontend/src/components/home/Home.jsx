import React from 'react';
import Navbar from '../navbar/Navbar'
//import PollCard from '../pollCard/Polls'
import './home.css';

class Home extends React.Component {

    state = {
        polls: [
            {
                question: 'Democrat or Republican?',
                answers: ['Democrat', 'Republican'],
                votes: [51, 49],
                id: 0,
                tags: ['Parties', 'President', 'Alignment'],
                user: 'Hayden Center',
                date: '11/21/2019'
            }
        ],
        posts: []
    }
    render() {
        return (<>
            <Navbar />
            <div className='home-container'>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6 text-left">
                                            <h1 className="card-title">Card Title</h1>
                                        </div>
                                        <div className="col-6 text-right">
                                            <button className="btn">
                                                New Post
                                                </button>
                                        </div>
                                    </div>
                                    {this.state.posts.map(poll =>
                                        <div className="row">
                                            <div className="col-12">
                                                {/* <PollCard poll={poll} /> */}
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h4 className="card-title">{poll.question}</h4>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6 text-left">
                                            <h1 className="card-title">Card Title</h1>
                                        </div>
                                        <div className="col-6 text-right">
                                            <button className="btn">
                                                New Poll
                                                </button>
                                        </div>
                                    </div>
                                    {this.state.polls.map(poll =>
                                        <div className="row">
                                            <div className="col-12">
                                                {/* <PollCard poll={poll} /> */}
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h4 className="card-title">{poll.question}</h4>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>);
    }
}

export default Home;