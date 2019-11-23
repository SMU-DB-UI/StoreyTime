import React from 'react';
import Navbar from '../navbar/Navbar'
import PollCard from '../pollCard/PollCard'
import './polls.css';

const Polls = props => (
    <>
        <Navbar />
        <div className='container'>
            {/*Give each card an id so it can be populated separately*/}
            <br></br>
            <PollCard />
        </div>
    </>
);

export default Polls;