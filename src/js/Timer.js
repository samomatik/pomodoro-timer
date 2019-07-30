import React from 'react';

class Timer extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="timer">
                    <div>
                        <p id="break-label">Break Length</p>
                        <p id="break-length">{this.props.breakLength}</p>
                    </div>
                    <div>
                        <p id="session-label">Session Length</p>
                        <p id="session-length">{this.props.sessionLength}</p>
                    </div>
                </div>

                <div className="clock">
                    <p id="timer-label">Session</p>
                    <p id="time-left">{this.props.timeRemaining}</p>
                </div>

                <div className="controls">
                    <div className="break-controls">
                        <button onClick={this.props.handleClick}><i id="break-increment" className="fa fa-arrow-circle-o-up"></i></button>
                        <p>Break</p>
                        <button onClick={this.props.handleClick}><i id="break-decrement" className="fa fa-arrow-circle-o-down"></i></button>
                    </div>
                    <div className="timer-controls">
                        <button onClick={this.props.handleTimer}><i id="start_stop" className="fa fa-play-circle-o"></i></button>
                        <button onClick={this.props.handleTimer}><i id="reset" className="fa fa-repeat"></i></button>
                    </div>
                    <div className="session-controls">
                        <button onClick={this.props.handleClick}><i id="session-increment" className="fa fa-arrow-circle-o-up"></i></button>
                        <p>Session</p>
                        <button onClick={this.props.handleClick}><i id="session-decrement" className="fa fa-arrow-circle-o-down"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timer;