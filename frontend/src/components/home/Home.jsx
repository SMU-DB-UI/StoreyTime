import React from 'react';
import Navbar from '../navbar/Navbar'
import PostCard from '../postCard/PostCard'
import PollCard from '../pollCard/PollCard'
import './home.css';

class Home extends React.Component {

    state = {
        feed: [
            {
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
                tags: ['Parties', 'President', 'Alignment'],
                question: 'Democrat or Republican?',
                answers: ['Democrat', 'Republican', 'Other'],
                votes: [42, 40, 18],
                totalVotes: 100, //find a way to compute this before putting it in
                user: 'Hayden Center',
                userId: 0,
                date: '11/21/2019',
                dateTime: new Date(),
                isPoll: true
            }
        ]
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
                                            <form className="form-inline feed-top">
                                                <input className="form-control" type="text" placeholder="Search"
                                                    aria-label="Search" />
                                                <button className="btn" type='button'>New Post</button>
                                                <button className="btn" type='button'>New Poll</button>
                                            </form>
                                        </div>
                                    </div>
                                    {this.state.feed.map(feed =>
                                        <><br />
                                            <div className="row">
                                                <div className="col-12">
                                                    {feed.isPoll === false && (<PostCard post={feed} />)}
                                                    {feed.isPoll === true && (<PollCard poll={feed} />)}
                                                </div>
                                            </div>
                                        </>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>);
    }
}

export default Home;