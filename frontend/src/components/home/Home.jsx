import React from 'react';
import Navbar from '../navbar/Navbar'
import PostCard from '../postCard/PostCard'
import PollCard from '../pollCard/PollCard'
import './home.css';
import { Redirect } from 'react-router-dom';
import { PostRepo } from '../../api/postRepo';
import { PollRepo } from '../../api/pollRepo';

class Home extends React.Component {

    constructor(props) {

        super(props);

        this.postRepo = new PostRepo();
        this.pollRepo = new PollRepo();
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
            feed: [],
            newPost: {
                title: '',
                body: '',
                availableTags: [],
                tags: [],
                nextTag: ''
            },
            newPoll: {
                title: '',
                answers: ['', ''],
                availableTags: [],
                tags: [],
                nextTag: ''
            },
            search: ''
        }
    }

    submitPost() {
        let newP = {
            title: this.state.newPost.title,
            post_text: this.state.newPost.body
        };
        this.postRepo.createPost(newP)
            .then(res => {
                this.state.newPost.tags.forEach(tag => {
                    this.postRepo.addTags(res.post_id, tag.toLowerCase())
                        .then(resp => console.log(resp))
                        .catch(resp => console.log(resp));
                });
                this.resetNewPost();
                this.resetPostTags();
                window.location.reload();
            })
            .catch(res => alert(res));
    }

    submitPoll() {
        let newP = { question: this.state.newPoll.title };

        this.pollRepo.createPoll(newP)
            .then(res => {
                this.state.newPoll.tags.forEach(tag => {
                    this.pollRepo.addTags(res.poll_id, tag.toLowerCase())
                        .then(resp => console.log(resp))
                        .catch(resp => alert(resp));
                });
                this.state.newPoll.answers.forEach(answer => {
                    this.pollRepo.addOption(res.poll_id, answer)
                        .then(resp => console.log(resp))
                        .catch(resp => alert(resp));
                });
                this.resetNewPoll();
                this.resetPollTags();
                window.location.reload();
            })
            .catch(res => alert(res));
    }

    resetPostTags() {
        this.setState(prevState => {
            for (var i = 0; i < this.state.tags.length; i++) {
                prevState.newPost.availableTags.push(this.state.tags[i])
            }
            return prevState;
        })
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
                tags: [],
                nextTag: ''
            }
        })
    }

    resetNewPoll() {
        this.setState({
            newPoll:
            {
                title: '',
                answers: ['', ''],
                availableTags: [],
                tags: [],
                nextTag: ''
            }
        })
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
                                                <input className="form-control mr-sm-3 mb-sm-0 mb-2"
                                                    type="text"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    value={this.state.search}
                                                    onChange={e => { this.setState({ search: e.target.value }); this.filterFeed(); }}
                                                />
                                                <button type="button" className="form-control mr-sm-3 mb-sm-0 mb-2" data-toggle="modal" data-target="#postModal">
                                                    New Post
                                                </button>
                                                <button type="button" className="form-control" data-toggle="modal" data-target="#pollModal">
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
                                                                    <input type="text"
                                                                        className="form-control"
                                                                        id="poll-title"
                                                                        placeholder="Poll title"
                                                                        value={this.state.newPoll.title}
                                                                        onChange={e => { var val = e.target.value; this.setState(prevState => { prevState.newPoll.title = val; return prevState }) }}
                                                                    />
                                                                </div>
                                                                <div className="form-group" id="poll-answers">
                                                                    <label htmlFor="poll-answers" className="text-left">Options</label>
                                                                    {this.state.newPoll.answers.map((answer, index) =>
                                                                        <input type="text"
                                                                            key={index}
                                                                            className="form-control mb-2"
                                                                            id={"poll-answer-" + (index + 1)}
                                                                            placeholder={"Option " + (index + 1)}
                                                                            onChange={e => {
                                                                                var val = e.target.value;
                                                                                this.setState(prevState => {
                                                                                    prevState.newPoll.answers[index] = val;
                                                                                    return prevState;
                                                                                })
                                                                            }} />
                                                                    )}
                                                                    <button className="form-control" type="button" onClick={() => this.setState(prevState => {
                                                                        prevState.newPoll.answers.push("");
                                                                        return prevState;
                                                                    })}>Add Option</button>
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
                                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.submitPoll() }}>Submit Poll</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {
                                        this.state.feed.length > 0 ?
                                            (
                                                this.state.feed.map(f =>
                                                    <div className="post-item" key={(f.post_id ? "post-" : "poll-") + (f.post_id || f.poll_id)}><br />
                                                        <div className="row">
                                                            <div className="col-12">
                                                                {(f.post_id && <PostCard post={f} onRemove={(id) => this.postRepo.deletePost(id).then(window.location.reload()).catch()} key={f.post_id} />)}
                                                                {((f.PID || f.poll_id) && <PollCard poll={f} votes={f} onVote={(post_id, answer_text, answer_count) => { this.onVote(post_id, answer_text, answer_count) }} onRemove={(id, c_id) => this.pollRepo.deletePoll(id, c_id).then(window.location.reload()).catch()} key={f.PID || f.poll_id} />)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                            :
                                            (
                                                <>
                                                    <br />
                                                    <h1>Oh no, your feed is empty, either create a post or follow tags in your <a href="/profile">profile</a> page!</h1>
                                                </>
                                            )
                                    }
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
        var feedarray = [];

        this.postRepo.getHomePosts()
            .then(resp => {
                resp.forEach(item => {
                    feedarray = [...feedarray, item];
                });
                this.pollRepo.getHomePolls()
                    .then(respo => {
                        respo.res.forEach(item => {
                            feedarray = [...feedarray, item];
                        });
                        this.postRepo.getMyPosts()
                            .then(resp => {
                                resp.res.forEach(item => {
                                    if (!feedarray.find(ele => item.post_id === ele.post_id))
                                        feedarray = [...feedarray, item];
                                });
                                this.pollRepo.getMyPolls()
                                    .then(respo => {
                                        respo.res.forEach(item => {
                                                feedarray = [...feedarray, item];
                                        });
                                        feedarray = feedarray.filter(elem => {
                                            if (elem.I == 1)
                                                return false;
                                            return !elem.inactive;
                                        })
                                        feedarray.forEach(item => {
                                            let x = [];
                                            if (item.poll_id || item.PID) {
                                                for (let j = 0; j < item['group_concat( `answer_count`)'].split(',').length; j = j + item['group_concat(distinct `tag_word`)'].split(',').length) {
                                                    x.push(item['group_concat( `answer_count`)'].split(',')[j]);
                                                }
                                                item['group_concat( `answer_count`)'] = x;
                                            }
                                        });
                                        feedarray = feedarray.sort((a, b) => {
                                            if(a.date_created > b.date_created)
                                                return -1;
                                            if(a.date_created < b.date_created)
                                                return 1;
                                        });
                                        this.setState({ feed: feedarray })
                                    })
                                    .catch(respo => alert(respo));
                            })
                            .catch(resp => alert(resp));
                    })
                    .catch(respo => alert(respo));
            })
            .catch(resp => alert(resp));
    }

    filterFeed() {
        var x = document.querySelectorAll('.post-item');
        x.forEach(post => {
            if (!post.innerHTML.toLowerCase().includes(this.state.search.toLowerCase())) {
                post.classList.add('d-none');
            } else {
                post.classList.remove('d-none');
            }
        })
        this.forceUpdate();
    }

    onVote(post_id, answer_text, answer_count) {
        this.pollRepo.pollVote(post_id, answer_text, answer_count)
            .then(resp => this.forceUpdate())
            .catch(resp => { });
        debugger;
        this.forceUpdate();
    }
}

export default Home;