import React from 'react';
import './postCard.css';

const PostCard = props => (
    <div className='card'>
        <div className='card-body'>
            <div className='card-title'>
                <div className="row">
                    <div className='text-left col-lg-6 col-12'>
                        <h4>{props.post.title}</h4>
                    </div>
                    <div className='text-lg-right text-left col-lg-6 col-12'>
                        <p className='text-muted'>{props.post.user} - {props.post.date}</p>
                    </div>
                </div>
            </div>
            <div className='card-text text-left'>
                <p>{props.post.text}</p>
            </div>
        </div>
    </div>
)

export default PostCard;