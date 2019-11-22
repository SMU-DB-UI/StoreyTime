  
import React from 'react';
import './pollCard.css';

class PollCard extends React.Component {

    state = {
        title : "QUESTION ",
        options: ["Zero Stars", "Three Stars", "# Stars", "56/88"],
        votes: [25, 30, 40, 5],
        totalVotes: 0
    };

    sumVotes() {
        var sum = 0;
        for (var i = 0; i < this.state.votes.length; i++) {
            sum += this.state.votes[i]
        }
        return sum;
    }

  componentWillMount() {
    this.setState(pState => {
        pState.totalVotes = this.sumVotes();
        return pState;
    });
}

render() {
    return (
        <>
            <br />
            <div className='card'>
                <div className = "text-left" >
                {this.state.title}
                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: this.state.votes[0]/this.state.totalVotes * 100 + '%'}} aria-valuenow={this.state.votes[0]} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className = "text-left" >
                {this.state.options[0]}
                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: this.state.votes[1]/this.state.totalVotes * 100 + '%'}} aria-valuenow={this.state.votes[1]} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className = "text-left" >
                {this.state.options[1]}
                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: this.state.votes[2]/this.state.totalVotes * 100 + '%'}} aria-valuenow={this.state.votes[2]} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className = "text-left" >
                {this.state.options[2]}
                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: this.state.votes[3]/this.state.totalVotes * 100 + '%'}}  aria-valuenow={this.state.votes[3]} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className = "text-left" >
                {this.state.options[3]}
                </div>
            </div>
        </>
    )
}
}
export default PollCard