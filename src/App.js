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
      timeRemaining: '25:00',
      timerId: 25,
      timerOn: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  handleClick(event) {
    switch (event.target.id) {
      case 'break-decrement':
        return this.setState(state => ({
          breakLength: state.breakLength <= 1 ? state.breakLength : state.breakLength - 1
        }));
      case 'break-increment':
        return this.setState(state => ({
          breakLength: state.breakLength >= 60 ? state.breakLength : state.breakLength + 1
        }));
      case 'session-decrement':
        return this.setState(state => ({
          sessionLength: state.sessionLength <= 1 ? state.sessionLength : state.sessionLength - 1
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
    if (event.target.id === 'start_stop' && !this.state.timerOn) {
      this.startTimer(this.state.sessionLength);
    }
    else if (event.target.id === 'start_stop' && this.state.timerOn) {
      this.stopTimer();
    }
    else if (event.target.id === 'reset') {
      this.resetTimer();
    }
  }

  startTimer = (duration) => {
    this.setState({
      timerOn: true,
    });
    let time = duration * 60;
    let minutes;
    let seconds;
    let runningTimer = setInterval(() => {
      this.setState({
        timerId: runningTimer
      })
      
      minutes = Math.floor(time / 60);
      seconds = time - minutes * 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.setState({
        timeRemaining: `${minutes}:${seconds}`
      })
      if (time <= 0) {
        if (this.state.sessionType === "Work") {
          this.setState({
            sessionType: "Break",
            timerOn: false
          })
          clearInterval(this.state.timerId);
          this.startTimer(this.state.breakLength);
        } else {
          this.setState({
            sessionType: "Work",
            timerOn: false
          })
          clearInterval(this.state.timerId);
          this.startTimer(this.state.sessionLength);
        }
      }
      time = time - 1;
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.state.timerId);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      sessionType: "Work",
      timeRemaining: "25:00",
      timerId: 0
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
        />
        <ReactFCCtest />
      </div>
    )
  }
}

export default App;
