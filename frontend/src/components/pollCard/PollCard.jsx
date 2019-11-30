import React from 'react';
import './pollCard.css';

const PollCard = props => (
    <>
        <br />
        <div className='card'>
            <div className="card-body">
                <div className="row">
                    <div className='text-left col-lg-6 col-12'>
                        <h4>{props.poll.question}</h4>
                    </div>
                    <div className='text-lg-right text-left col-lg-6 col-12'>
                        <p className='text-muted'>{props.poll.user} - {props.poll.date}</p>
                    </div>
                </div>
                {props.poll.votes.map((voteCount, index) => (
                    <div className="text-left" key={index}>
                        <br />
                        <label className="text-left">{props.poll.answers[index]}</label>
                        <div className="progress">
                            <div className="progress-bar"
                                role="progressbar"
                                style={{ width: voteCount / props.poll.totalVotes * 100 + '%' }}
                                aria-valuenow={voteCount}
                                aria-valuemin="0"
                                aria-valuemax="100"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
)

export default PollCard;