import React, { Component } from 'react';
import HomeCard from '../homeCard/HomeCard'
import './home.css';

class Home extends Component {
    state = {};
    render() {
        return (
            <div className="cards">
                {/*Give each card an id so it can be populated separately*/}
                <HomeCard />
                <HomeCard />
                <HomeCard />
                <HomeCard />

            </div>
        )
    }
}

export default Home;