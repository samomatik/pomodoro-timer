import React from 'react';
import './App.css';
import Timer from './js/Timer.js';
import ReactFCCtest from 'react-fcctest';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25
    }

    this.handleClick = this.handleClick.bind(this);
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
        console.log('Something went wrong');
    }
  }
  render() {
    console.log(this.state.date);
    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <Timer
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          handleClick={this.handleClick}
        />
        <ReactFCCtest />
      </div>
    )
  }
}

export default App;
