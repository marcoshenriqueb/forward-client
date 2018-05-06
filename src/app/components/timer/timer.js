import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './timer.styl';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: null,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    const counter = moment.duration(moment().diff(moment(this.props.date)))
      .format('mm:ss', { trim: false });
    this.setState({ counter });
  }

  render() {
    return <h2 className="card-title timer-text text-center">{this.state.counter}</h2>;
  }
}

Timer.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Timer;
