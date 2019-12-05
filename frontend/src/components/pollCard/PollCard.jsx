import React from 'react';
import './pollCard.css';

const PollCard = props => (
    <div className='card'>
        <div className="card-body">
            <div className="row">
                <div className='text-left col-lg-6 col-12'>
                    <h4>{props.poll.question}</h4>
                </div>
                <div className='text-lg-right text-left col-lg-6 col-12'>
                    <p className='text-muted'>
                        {(props.poll.firstName || localStorage.getItem('firstName')) + " " + (props.poll.lastName || localStorage.getItem('lastName'))} - {props.poll.date_created}
                    </p>
                    {(localStorage.getItem('id') == props.poll.creator_id) && <button className="btn btn-danger" onClick={() => props.onRemove(props.poll.PID || props.poll.poll_ID, props.poll.creator_id)}>X</button>}
                </div>
            </div>
            {props.poll['group_concat(distinct `answer_text`)'].split(',').map((answer, index) => (
                <div className="text-left" key={index}>
                    <label className="text-left">{answer}</label>
                    <div className="progress">
                        <div className="progress-bar"
                            role="progressbar"
                            // style={{ width: voteCount / props.poll.totalVotes * 100 + '%' }}
                            // aria-valuenow={voteCount}
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                    <br />
                </div>
            ))}
            <div className='card-text text-left'>
                <h5>
                    {props.poll['group_concat(distinct `tag_word`)'].split(',').map((tag, index) => <span className="badge badge-primary mr-3 mt-1" key={index}>{tag}</span>)}
                </h5>
            </div>
        </div>
    </div>
)

export default PollCard;