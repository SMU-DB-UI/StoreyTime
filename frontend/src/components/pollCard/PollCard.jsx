import React from 'react';
import './pollCard.css';

const PollCard = props => (
    <div className='card'>
        <div className="card-body">
            <div className="row">
                <div className='text-left col-lg-6 col-12'>
                    <h4>{props.poll.title}</h4>
                </div>
                <div className='text-lg-right text-left col-lg-6 col-12'>
                    <p className='text-muted'>{props.poll.user} - {props.poll.date}
                        {(localStorage.getItem('id') === props.poll.id) && <a onClick={() => {/*remove me from the whole thing*/ }}>x</a>}
                    </p>
                </div>
            </div>
            {props.poll.votes.map((voteCount, index) => (
                <div className="text-left" key={index}>
                    <label className="text-left">{props.poll.answers[index]}</label>
                    <div className="progress">
                        <div className="progress-bar"
                            role="progressbar"
                            style={{ width: voteCount / props.poll.totalVotes * 100 + '%' }}
                            aria-valuenow={voteCount}
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                    <br />
                </div>
            ))}
            <div className='card-text text-left'>
                <h5>
                    {props.poll.tags.map((tag, index) => <span className="badge badge-primary mr-3 mt-1" key={index}>{tag}</span>)}
                </h5>
            </div>
        </div>
    </div>
)

export default PollCard;