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
      timeRemaining: '00:00',
      timerOn: false,
      timerStart: 0,
      timerTime: 0
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  handleClick(event) {
    switch (event.target.id) {
      case 'break-decrement':
        return this.setState(state => ({
          breakLength: state.breakLength <= 0 ? state.breakLength : state.breakLength - 1
        }));
      case 'break-increment':
        return this.setState(state => ({
          breakLength: state.breakLength > 60 ? state.breakLength : state.breakLength + 1
        }));
      case 'session-decrement':
        return this.setState(state => ({
          sessionLength: state.sessionLength <= 0 ? state.sessionLength : state.sessionLength - 1
        }));
      case 'session-increment':
        return this.setState(state => ({
          sessionLength: state.sessionLength >= 60 ? state.sessionLength : state.sessionLength + 1
        }));
      default:
        return;
    }
  }

  handleTimer(event) {
    console.log(event.target);
    
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
        this.setState({ timerOn: false });
        alert("Countdown ended");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart
      });
    }
  };

  render() {
    
    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <Timer
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          timeRemaining={this.state.timeRemaining}
          handleClick={this.handleClick}
          handleTimer={this.handleTimer}
        />
        <ReactFCCtest />
      </div>
    )
  }
}

export default App;
