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
                        <p className='text-muted'>{props.post.user} - {props.post.date}
                            {(localStorage.getItem('id') === props.post.id) && <p onClick={() => {/*remove me from the whole thing*/ }}>a{test}</p>}
                        </p>
                    </div>
                </div>
            </div>
            <div className='card-text text-left'>
                <p>{props.post.text}</p>
            </div>
            <div className='card-text text-left'>
                <h5>
                    {props.post.tags.map((tag, index) => <span className="badge badge-primary mr-3 mt-1" key={index}>{tag}</span>)}
                </h5>
            </div>
        </div>
    </div>
)

export default PostCard;