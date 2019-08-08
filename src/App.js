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
      timerId: 0,
      timerOn: false,
      timer: 0
    }

    this.updateTimer = this.updateTimer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.clockify = this.clockify.bind(this);
  }

  componentDidMount() {
    this.updateTimer();
  }

  updateTimer() {
    this.setState({
      timer: this.state.sessionLength * 60
    }, function stateUpdateComplete() {
      this.clockify(this.state.timer)
    }.bind(this));
  }

  handleClick(event) {
    switch (event.target.id) {
      case 'break-decrement':
        this.setState(state => ({
          breakLength: state.breakLength <= 1 ? state.breakLength : state.breakLength - 1
        }));
        break;
      case 'break-increment':
        this.setState(state => ({
          breakLength: state.breakLength >= 60 ? state.breakLength : state.breakLength + 1
        }));
        break;
      case 'session-decrement':
        this.setState(state => ({
          sessionLength: state.sessionLength <= 1 ? state.sessionLength : state.sessionLength - 1,
          timer: state.sessionLength <=1 ? this.state.sessionLength * 60 : (this.state.sessionLength - 1) * 60
        }), function stateUpdateComplete() {
          this.clockify(this.state.timer)
        }.bind(this));
        break;
      case 'session-increment':
        return this.setState(state => ({
          sessionLength: state.sessionLength >= 60 ? state.sessionLength : state.sessionLength + 1,
          timer: state.sessionLength >= 60 ? this.state.sessionLength * 60 : (this.state.sessionLength + 1) * 60
        }), function stateUpdateComplete() {
          this.clockify(this.state.timer)
        }.bind(this));
      default:
        return;
    }
  }

  handleTimer(event) {
    if (event.target.id === 'start_stop' && !this.state.timerOn) {
      this.startTimer();
    }
    else if (event.target.id === 'start_stop' && this.state.timerOn) {
      this.stopTimer();
    }
    else if (event.target.id === 'reset') {
      this.resetTimer();
    }
  }

  clockify = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    this.setState({
      timeRemaining: `${minutes}:${seconds}`
    });
  }

  startTimer = () => {
    this.setState({
      timerOn: true
    });
    let time = this.state.timer - 1;
    let runningTimer = setInterval(() => {
      this.setState({
        timerId: runningTimer
      })
      
      this.clockify(time)
      
      if (time <= 0) {
        if (this.state.sessionType === "Work") {
          this.setState(state => ({
            sessionType: "Break",
            timerOn: false,
            timer: state.breakLength * 60
          }));
          clearInterval(this.state.timerId);
          this.startTimer();
        } else {
          this.setState(state => ({
            sessionType: "Work",
            timerOn: false,
            timer: state.sessionLength * 60
          }));
          clearInterval(this.state.timerId);
          this.startTimer();
        }
      }
      time = time - 1;
      this.setState({
        timer: time
      })
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
      timerId: 0,
      timer: 1500
    }, function stateUpdateComplete() {
      this.clockify(this.state.timer)
    }.bind(this));
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
