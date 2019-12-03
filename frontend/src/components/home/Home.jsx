import React from 'react';
import Navbar from '../navbar/Navbar'
import PostCard from '../postCard/PostCard'
import PollCard from '../pollCard/PollCard'
import './home.css';
import { Redirect } from 'react-router-dom';
import { PostRepo } from '../../api/postRepo';

class Home extends React.Component {

    constructor(props) {

        super(props);

        this.postRepo = new PostRepo();
        this.state = {
            tags: [
                "Republican",
                "Conservative",
                'Democrat',
                'Liberal',
                "Immigration",
                'Abortion',
                'Climate Change',
                'Gun Control',
                'Unemployment',
                'Education',
                'Religion',
                'Drug Policy',
                'Patriot Act',
                'Net Neutrality',
                'Equal Pay',
                'Taxes',
                'Welfare',
                'Medicaid',
                'Vaccinationas',
                'Terrorism',
                'Racism'
            ],
            feed: [
                {
                    id: 0,
                    tags: ['Guns', 'School', 'Children'],
                    title: 'Give All Children Guns',
                    text: 'Just like we teach them reading and writing, necessary skills. We would teach shooting and firearm competency. It wouldn’t matter if a child’s parents weren’t good at it. We’d find them a mentor. It wouldn’t matter if they didn’t want to learn. We would make it necessary to advance to the next grade.',
                    user: 'Hayden Center',
                    userId: 0,
                    date: new Date().toDateString(),
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
                    date: new Date().toDateString(),
                    dateTime: new Date(),
                    isPoll: true
                }
            ],
            newPost: {
                title: '',
                body: '',
                availableTags: [],
                tags: [],
                nextTag: ''
            },
            newPoll: {
                question: '',
                answers: [],
                availableTags: [],
                tags: [],
                nextTag: ''
            }
        }
    }

    resetPostTags() {
        this.setState(prevState => {
            for (var i = 0; i < this.state.tags.length; i++) {
                debugger;
                prevState.newPost.availableTags.push(this.state.tags[i])
            }
            return prevState;
        })
    }

    submitPost() {
        // let id = -1;
        let newP = {
            post_title: this.state.newPost.title,
            post_text: this.state.newPost.body
        };
        this.postRepo.createPost(newP)
            .then(res => {
                console.log(res);
                this.state.newPost.tags.forEach(tag => {
                    console.log(tag);
                    this.postRepo.addTags(res.post_id, tag)
                        .then(resp => (console.log(resp)))
                        .catch(resp => (console.log(resp)));
                });
                var feedItem = {
                    id: res.post_id,
                    tags: this.state.newPost.tags,
                    title: newP.post_title,
                    text: newP.post_text,
                    user: `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`,
                    userId: localStorage.getItem('id'),
                    date: new Date().toDateString(),
                    dateTime: new Date(),
                    isPoll: false
                };
                console.log(feedItem);
                this.setState({
                    feed: [feedItem, ...this.state.feed]
                });
                this.resetNewPost();
                this.resetPostTags();
                debugger;
            })
            .catch(res => {
                alert(res);
            });
    }

    resetPollTags() {
        this.setState(prevState => {
            for (var i = 0; i < this.state.tags.length; i++) {
                prevState.newPoll.availableTags.push(this.state.tags[i])
            }
            return prevState;
        })
    }

    resetNewPost() {
        this.setState({
            newPost:
            {
                title: '',
                body: '',
                availableTags: [],
                tags: []
            }
        })
    }

    resetNewPoll() {
        this.setState({
            newPoll:
            {
                title: '',
                body: '',
                availableTags: [],
                tags: []
            }
        })
    }

    componentWillMount() {
    }

    render() {
        if (!localStorage.getItem('id')) {
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
                                                <input className="form-control mr-sm-3" type="text" placeholder="Search"
                                                    aria-label="Search" />
                                                <select className="form-control mr-md-3" type="tag" placeholder="Tag">
                                                    {this.state.tags.map((tag, index) =>
                                                        <option value={tag} key={index}>{tag}</option>)}
                                                </select>
                                                <button type="button" className="btn mr-3" data-toggle="modal" data-target="#postModal">
                                                    New Post
                                                </button>
                                                <button type="button" className="btn" data-toggle="modal" data-target="#pollModal">
                                                    New Poll
                                                </button>
                                            </form>


                                            <div className="modal fade" id="postModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">New Post</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body text-left">
                                                            <form className="post-modal">
                                                                <label htmlFor="post-title" className="text-left">Title</label>
                                                                <div className="form-group">
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="post-title"
                                                                        placeholder="Post title"
                                                                        value={this.state.newPost.title}
                                                                        onChange={e => { var val = e.target.value; this.setState(prev => { prev.newPost.title = val; return prev; }) }}
                                                                    />
                                                                </div>
                                                                <label htmlFor="post-body">Body</label>
                                                                <div className="form-group">
                                                                    <textarea className="form-control w-100"
                                                                        id="post-body"
                                                                        rows="3"
                                                                        placeholder="Post body"
                                                                        value={this.state.newPost.body}
                                                                        onChange={e => { var val = e.target.value; this.setState(prev => { prev.newPost.body = val; return prev; }) }}
                                                                    ></textarea>
                                                                </div>
                                                                <label htmlFor="post-tags">Tags</label>
                                                                {this.state.newPost.tags &&
                                                                    <div className="form-group">
                                                                        <ul className="list-group">
                                                                            {this.state.newPost.tags.map((tag, index) => <li className="list-group-item" key={index}>{tag}</li>)}
                                                                        </ul>
                                                                    </div>
                                                                }
                                                                <div className="form-group">
                                                                    <select className="form-control"
                                                                        id="post-tag-select"
                                                                        placeholder="Add Tag"
                                                                        value={this.state.newPost.nextTag}
                                                                        onChange={e => {
                                                                            var val = e.target.value; this.setState(prevState => {
                                                                                prevState.newPost.nextTag = val;
                                                                                return prevState;
                                                                            })
                                                                        }
                                                                        }
                                                                        selected=''>
                                                                        <option value='' disabled>Add Tag</option>
                                                                        {this.state.newPost.availableTags.map((tag, index) =>
                                                                            <option value={tag} key={index}>{tag}</option>)}
                                                                    </select>
                                                                </div>
                                                                {this.state.newPost.nextTag &&
                                                                    <button className="form-control" type="button" onClick={() => {
                                                                        this.setState(prevState => {
                                                                            prevState.newPost.tags.push(this.state.newPost.nextTag);
                                                                            var index = prevState.newPost.availableTags.indexOf(this.state.newPost.nextTag);
                                                                            if (index > -1) {
                                                                                prevState.newPost.availableTags.splice(index, 1);
                                                                            }
                                                                            prevState.newPost.nextTag = '';
                                                                        });
                                                                        this.forceUpdate()
                                                                    }}>Add Tag</button>}
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.submitPost(); }}>Submit Post</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal fade" id="pollModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">New Poll</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body text-left">
                                                            <form className="poll-modal">
                                                                <label htmlFor="poll-title" className="text-left">Title</label>
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" id="poll-title" placeholder="Poll title" />
                                                                </div>
                                                                <label htmlFor="poll-tags">Tags</label>
                                                                {this.state.newPoll.tags.length !== 0 &&
                                                                    <div className="form-group">
                                                                        <ul className="list-group">
                                                                            {this.state.newPoll.tags.map((tag, index) => <li className="list-group-item" key={index}>{tag}</li>)}
                                                                        </ul>
                                                                    </div>
                                                                }
                                                                <div className="form-group">
                                                                    <select className="form-control"
                                                                        id="poll-tag-select"
                                                                        placeholder="Add Tag"
                                                                        value={this.state.newPoll.nextTag}
                                                                        onChange={e => {
                                                                            var val = e.target.value; this.setState(prevState => {
                                                                                prevState.newPoll.nextTag = val;
                                                                                return prevState;
                                                                            })
                                                                        }
                                                                        }
                                                                        selected=''>
                                                                        <option value='' disabled>Add Tag</option>
                                                                        {this.state.newPoll.availableTags.map((tag, index) =>
                                                                            <option value={tag} key={index}>{tag}</option>)}
                                                                    </select>
                                                                </div>
                                                                {this.state.newPoll.nextTag &&
                                                                    <button className="form-control" type="button" onClick={() => {
                                                                        this.setState(prevState => {
                                                                            prevState.newPoll.tags.push(this.state.newPoll.nextTag);
                                                                            var index = prevState.newPoll.availableTags.indexOf(this.state.newPoll.nextTag);
                                                                            if (index > -1) {
                                                                                prevState.newPoll.availableTags.splice(index, 1);
                                                                            }
                                                                            prevState.newPoll.nextTag = '';
                                                                        });
                                                                        this.forceUpdate()
                                                                    }}>Add Tag</button>}
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.resetNewPoll(); this.resetPollTags() }}>Submit Poll</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


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
        this.resetPostTags();
        this.resetPollTags();
    }
}

export default Home;