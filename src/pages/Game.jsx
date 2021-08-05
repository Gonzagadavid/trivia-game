import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, bool, string, number, arrayOf, shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Question, Header } from '../components/index';
import { timeoutTrue as actionTimeoutTrue } from '../redux/actions';
import fetchQuiz from '../redux/fetchs/fetchQuiz';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      position: 0,
      question: { incorrect_answers: [] },
      score: 0,
      gameOver: false,

    };
    this.timer = this.timer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.checkQuestion = this.checkQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { getQuiz, token, amount, id } = this.props;
    this.startTimer(0, true);
    getQuiz(token, amount, id);
  }

  timer() {
    const { position } = this.state;
    const { timeoutTrue, loading, questions } = this.props;
    if (!loading) {
      this.setState((prev) => {
        if (prev.timer === 0) {
          clearInterval(this.interval);
          timeoutTrue();
          return;
        }
        return ({
          timer: prev.timer - 1,
          question: questions[position],
        });
      });
    }
  }

  checkQuestion(resp) {
    const scoreTable = { hard: 3, medium: 2, easy: 1 };
    const { question, timer } = this.state;
    const { correct_answer: correct, difficulty } = question;
    const pointsSum = 10;
    const points = pointsSum + (timer * scoreTable[difficulty]);
    const result = resp === correct;
    this.setState(({ score }) => ({ score: result ? score + points : score }), () => {
      if (!result) return;
      const { score } = this.state;
      const player = JSON.parse(localStorage.getItem('player'));
      localStorage.setItem('player', JSON.stringify({ ...player, score }));
    });
  }

  nextQuestion() {
    const { questions } = this.props;
    this.setState(({ position }) => ({ position: position + 1 }), () => {
      const { position } = this.state;
      const gameOver = position === questions.length;
      this.setState({ question: questions[position], gameOver });
    });
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
    const { timer, gameOver, question, score } = this.state;
    const { questions } = this.props;
    if (gameOver) { return <Redirect to="/" />; }// redirecionar  para a pagina de rancking
    return (
      <>
        <Header score={ score } />
        <p>{timer}</p>
        <Question
          startTimer={ this.startTimer }
          questions={ questions }
          checkQuestion={ this.checkQuestion }
          nextQuestion={ this.nextQuestion }
          question={ question }
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeoutTrue: () => dispatch(actionTimeoutTrue()),
  getQuiz: (token, amount, id) => dispatch(fetchQuiz(token, amount, id)),
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
  getQuiz: func.isRequired,
  token: string.isRequired,
  amount: number.isRequired,
  id: number.isRequired,
  questions: arrayOf(shape({
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  })).isRequired,
};
