import React from 'react';
import './postCard.css';

const PostCard = props => (
    <div className='card'>
        <div className='card-body'>
            <div className='card-title'>
                <div className="row">
                    <div className='text-left col-lg-6 col-12'>
                        <h4>{props.post.title.replace("'", "").replace("'", "")}</h4>
                    </div>
                    <div className='text-lg-right text-left col-lg-6 col-12'>
                        <p className='text-muted'>
                            {(props.post.firstName || localStorage.getItem('firstName')) + " " + (props.post.lastName || localStorage.getItem('lastName'))} - {props.post.date_created}
                        </p>
                        {((localStorage.getItem('id') == props.post.id) || (localStorage.getItem('id') == props.post.creator_id)) && <button className="btn btn-danger" onClick={() => props.onRemove(props.post.post_id)}>X</button>}
                    </div>
                </div>
            </div>
            <div className='card-text text-left'>
                <p>{props.post.post_text.replace("'", "").replace("'", "")}</p>
            </div>
            <div className='card-text text-left'>
                <h5>
                    {props.post['group_concat(distinct `tag_word`)'] && props.post['group_concat(distinct `tag_word`)'].split(',').map((tag, index) => <span className="badge badge-primary mr-3 mt-1" key={index}>{tag}</span>)}
                </h5>
            </div>
        </div>
    </div>
)

export default PostCard;