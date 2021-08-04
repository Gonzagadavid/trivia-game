import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeoutTrue, timeoutFalse } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = { timer: 3 };
  }

  componentDidMount() {
    const { timeoutFalse, timeoutTrue, loading } = this.props;
    timeoutFalse();
    const oneSec = 1000;
    if (loading) {
      setInterval(() => this.setState((prev) => {
        const { timer } = this.state;
        if (timer === 0) {
          timeoutTrue();
          return false;
        }
        console.log(timer);
        return ({
          timer: prev.timer - 1,
        });
      }), oneSec);
    }
  }

  count() {
    const { timer } = this.state;
    this.setState({ timer: timer - 1 });
    console.log(timer);
  }

  render() {
    const { timer } = this.state;
    return (
      <p>{timer}</p>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeoutFalse: () => dispatch(timeoutFalse()),
  timeoutTrue: () => dispatch(timeoutTrue()),
});

const mapStateToProps = (state) => ({
  loading: state.quiz.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
