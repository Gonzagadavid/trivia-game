import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';
import { Question, Header } from '../components/index';
import { timeoutTrue as actionTimeoutTrue } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = { timer: 30 };
    this.timer = this.timer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    const { getQuiz, token, amount, id } = this.props;
    console.log({token, amount, id})
    this.startTimer(0, true);
    getQuiz(token, amount, id);
  }

  timer() {
    const { timeoutTrue, loading } = this.props;
    if (!loading) {
      this.setState((prev) => {
        if (prev.timer === 0) {
          clearInterval(this.interval);
          timeoutTrue();
          return;
        }
        return ({
          timer: prev.timer - 1,
        });
      });
    }
  }

  startTimer(sec = 0, start) {
    const maxTime = 30;
    this.setState({ timer: maxTime + sec });
    const oneSec = 1000;
    if (start) {
      this.interval = setInterval(this.timer, oneSec);
      this.timer();
    }
  }

  render() {
    const { timer } = this.state;
    const { questions } = this.props
    console.log(questions)
    return (
      <>
        <Header />
        <p>{timer}</p>
        <Question startTimer={ this.startTimer } questions={questions}/>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeoutTrue: () => dispatch(actionTimeoutTrue()),
  getQuiz: (token, amount, id) => dispatch(fetchQuiz(token, amount, id)),
  timeoutFalse: () => dispatch(actionTimeoutFalse()),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
  amount: state.user.amount,
  id: state.user.id,
  questions: state.quiz.questions,
  loading: state.quiz.loading,
  timeout: state.quiz.timeout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  timeoutTrue: func.isRequired,
  loading: bool.isRequired,
};
