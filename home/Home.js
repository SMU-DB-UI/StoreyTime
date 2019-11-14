import React from 'react';
import HomeCard from '../homeCard/HomeCard'
import './home.css';

const Home = props => (
    <div className='home-container'>
        {/*Give each card an id so it can be populated separately*/}
        <HomeCard title='Card Title'
            name='Author Name'
            time='11:59, 01/01/1970'
            text='This is the body of the card. Information will be listed here such as details about a poll, candidate, or followed tag. They will be able to be sorted by their tags.'
            tags={['Tag1', 'Tag2', 'Tag3']} />
        <HomeCard title='Card Title'
            name='Author Name'
            time='11:59, 01/01/1970'
            text='This is the body of the card. Information will be listed here such as details about a poll, candidate, or followed tag. They will be able to be sorted by their tags.'
            tags={['Tag1', 'Tag2', 'Tag3']} />
        <HomeCard title='Card Title'
            name='Author Name'
            time='11:59, 01/01/1970'
            text='This is the body of the card. Information will be listed here such as details about a poll, candidate, or followed tag. They will be able to be sorted by their tags.'
            tags={['Tag1', 'Tag2', 'Tag3']} />
        <HomeCard title='Card Title'
            name='Author Name'
            time='11:59, 01/01/1970'
            text='This is the body of the card. Information will be listed here such as details about a poll, candidate, or followed tag. They will be able to be sorted by their tags.'
            tags={['Tag1', 'Tag2', 'Tag3']} />
    </div>
);

export default Home;