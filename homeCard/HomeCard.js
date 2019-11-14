import React from 'react';
import './homeCard.css';

const HomeCard = props => (
    <div className='hc-container'>
        <img src='https://placehold.it/150x150' alt=''></img>
        <div className='hc-body'>
            <div className='hc-content'>
                <div className='hc-info'>
                    <div className='hc-title'>
                        <h1>{props.title}</h1>
                        <h2>{props.name}</h2>
                    </div>
                    <div className='hc-time'>
                        <h3>{props.time}</h3>
                    </div>
                </div>
                <p>{props.text}</p>
                <div className='hc-tags'>
                    {props.tags.map(tag => (
                        <li key={tag} item={tag}>{tag}</li>
                    ))}
                </div>
            </div>
        </div>
    </div>
)

export default HomeCard;