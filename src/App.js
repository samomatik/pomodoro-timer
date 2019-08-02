import React from 'react';
import './App.css';
import Timer from './js/Timer.js';
import ReactFCCtest from 'react-fcctest';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      sessionType: 'Work',
      timeRemaining: '00:00',
      timerOn: false,
      timerTime: 0,
      timerStart: 0
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  setTimer(val) {
    let milliseconds = val * 60000;
    return milliseconds;
  }

  handleClick(event) {
    switch (event.target.id) {
      case 'break-decrement':
        return this.setState(state => ({
          breakLength: state.breakLength <= 1 ? state.breakLength : state.breakLength - 1
        }));
      case 'break-increment':
        return this.setState(state => ({
          breakLength: state.breakLength > 60 ? state.breakLength : state.breakLength + 1
        }));
      case 'session-decrement':
        return this.setState(state => ({
          sessionLength: state.sessionLength <= 1 ? state.sessionLength : state.sessionLength - 1,
          timerTime: this.setTimer(state.sessionLength - 1)
        }));
      case 'session-increment':
        return this.setState(state => ({
          sessionLength: state.sessionLength >= 60 ? state.sessionLength : state.sessionLength + 1,
          timerTime: this.setTimer(state.sessionLength + 1)
        }));
      default:
        return;
    }
  }

  handleTimer(event) {
    console.log(event.target);
    if (event.target.id === 'start_stop' && !this.state.timerOn) {
      this.setTimer(this.state.sessionLength);
      this.startTimer();
    }
    else if (event.target.id === 'start_stop' && this.state.timerOn) {
      this.stopTimer();
    }
    else if (event.target.id === 'reset') {
      this.resetTimer();
    }
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ 
          timerOn: false,
          sessionType: 'Break'
        });
        console.log("Take a break!");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      timerTime: 0
    });
  };

  render() {

    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <Timer
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          sessionType={this.state.sessionType}
          timeRemaining={this.state.timeRemaining}
          timerTime={this.state.timerTime}
          handleClick={this.handleClick}
          handleTimer={this.handleTimer}
          setTimer={this.setTimer}
        />
        <ReactFCCtest />
      </div>
    )
  }
}

export default App;
