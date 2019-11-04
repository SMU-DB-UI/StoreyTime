import React, { Component } from 'react';
import './homeCard.css';

class HomeCard extends Component {
    state = {};
    render() {
        return (
            <div className="homeCard">
                <img src="https://placehold.it/150x150"></img>
                <div className="cardBody">
                    <div className="cardContent">
                        <div className="cardInfo">
                            <div className="cardTitle">
                                <h1>Card Title</h1>
                                <h2>Author Name</h2>
                            </div>
                            <div className="cardTime">
                                <h3>11:59, 01/01/1970</h3>
                            </div>
                        </div>
                        <p>This is the body of the card. Information will be listed here such as details about a poll, candidate, or followed tag. They will be able to be sorted by their tags.</p>
                        <div className="tags">
                            <h4>Tag1</h4>
                            <h4>Tag2</h4>
                            <h4>Tag3</h4>
                            <h4>Tag4</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeCard;