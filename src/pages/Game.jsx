import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, bool, string, number, arrayOf, shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Question, Header } from '../components/index';
import { timeoutTrue as actionTimeoutTrue } from '../redux/actions';
import fetchQuiz from '../redux/fetchs/fetchQuiz';
import randomize from '../functions/randomize';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      position: 0,
      question: { incorrect_answers: [] },
      score: 0,
      gameOver: false,
      randomIndex: [],
      assertions: 0,

    };
    this.timer = this.timer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.checkQuestion = this.checkQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.completeRandomIndex = this.completeRandomIndex.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    const { getQuiz, token, amount, id, difficulty, type } = this.props;
    this.startTimer(0, true);
    getQuiz({ token, amount, id, difficulty, type });
    this.completeRandomIndex();
  }

  completeRandomIndex() {
    const length = 4;
    const qty = 3;
    const randomIndex = randomize(length, qty);
    this.setState({ randomIndex });
  }

  stopTimer() {
    const { timeoutTrue } = this.props;
    clearInterval(this.interval);
    timeoutTrue();
  }

  timer() {
    const { position } = this.state;
    const { loading, questions } = this.props;
    if (!loading) {
      this.setState((prev) => {
        if (prev.timer === 0) {
          this.stopTimer();
          return;
        }
        return ({
          timer: prev.timer - 1,
          question: questions[position],
        });
      });
    }
  }

  checkQuestion() {
    this.setState((prevState) => {
      const hard = 3;
      const { question, timer, score, assertions } = prevState;
      const { difficulty } = question;
      const level = difficulty === 'hard' ? hard : 2;
      const pointsSum = 10;
      const points = timer * (difficulty === 'hard' ? 1 : level) + score + pointsSum;
      const state = JSON.parse(localStorage.getItem('state')) || {};
      const local = JSON.stringify(
        { player: { ...state.player, score: points, assertions } },
      );
      localStorage.setItem(
        'state',
        local,
      );
      return ({
        score: points,
        assertions: assertions + 1,
      });
    });
  }

  nextQuestion() {
    const { questions } = this.props;
    this.setState(({ position }) => ({ position: position + 1 }), () => {
      const { position } = this.state;
      const gameOver = position === questions.length;
      this.setState({ question: questions[position], gameOver });
    });
    this.completeRandomIndex();
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
    const { timer, gameOver, question, score, randomIndex } = this.state;
    const { questions } = this.props;
    if (gameOver) { return <Redirect to="/feedback" />; }
    return (
      <>
        <Header score={ score } />
        <p>{timer}</p>
        <Question
          stopTimer={ this.stopTimer }
          startTimer={ this.startTimer }
          questions={ questions }
          checkQuestion={ this.checkQuestion }
          nextQuestion={ this.nextQuestion }
          question={ question }
          randomIndex={ randomIndex }
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeoutTrue: () => dispatch(actionTimeoutTrue()),
  getQuiz: (data) => dispatch(fetchQuiz(data)),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
  amount: state.user.amount,
  id: state.user.id,
  difficulty: state.user.difficulty,
  type: state.user.type,
  questions: state.quiz.questions,
  loading: state.quiz.loading,
  timeout: state.quiz.timeout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  timeoutTrue: func.isRequired,
  loading: bool.isRequired,
  getQuiz: func.isRequired,
  token: string.isRequired,
  type: string.isRequired,
  difficulty: string.isRequired,
  amount: number.isRequired,
  id: number.isRequired,
  questions: arrayOf(shape({
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  })).isRequired,
};
