import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './button';
import randomize from '../functions/randomize';
import { timeoutFalse as actionTimeoutFalse } from '../redux/actions';
import { timeoutTrue as actionTimeoutTrue } from '../redux/actions';


class Question extends Component {
  constructor() {
    super();
    this.state = {
      button: false,
      pergunta: 0,
      showCorrect: false,
    };
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.changeBorder = this.changeBorder.bind(this);
  }

  handleClickButton() {
    this.setState({ button: true });
    this.changeBorder();
  }

  handleClickNext() {
    const { timeoutFalse, startTimer, timeout } = this.props;
    if (timeout) {
      startTimer(1, true);
    } else { startTimer(0, false); }
    timeoutFalse();
    this.setState((state) => {
      const { questions } = this.props;
      if (state.pergunta >= questions.length - 1) {
        return ({
          button: false,
          showCorrect: false,
        });
      }
      return ({
        pergunta: state.pergunta + 1,
        button: false,
        showCorrect: false,
      });
    });
  }

  changeBorder() {
    this.setState({
      showCorrect: true,
    });
  }

  render() {
    const { button, pergunta, showCorrect } = this.state;
    const { questions, loading, timeout } = this.props;
    if (loading) { return <p>Loading...</p>; }
    const alternatives = [
      ...questions[pergunta].incorrect_answers
        .map((alt, index) => ({ correct: false, alt, index, isCorrect: 'wrong-answer' })),
      { correct: true,
        alt: questions[pergunta].correct_answer,
        isCorrect: 'correct-border' }];
    const randomIndex = randomize(alternatives.length, alternatives.length - 1);
    return (
      <div className="question">

        <h1 data-testid="question-category">{questions[pergunta].category}</h1>
        <p data-testid="question-text">{questions[pergunta].question}</p>

        <div className="alternatives">
          {randomIndex.map((index) => {
            const { correct, alt, index: i, isCorrect } = alternatives[index];
            return (
              <button
                disabled={ timeout }
                type="button"
                key={ alt }
                data-testid={ correct ? 'correct-answer' : `wrong-answer${i}` }
                onClick={ this.handleClickButton }
                className={ showCorrect ? isCorrect : '' }
              >
                {alt}
              </button>
            );
          })}
          { (button || timeout) && <Button onClick={ this.handleClickNext } /> }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.quiz.loading,
  timeout: state.quiz.timeout,
});

const mapDispatchToProps = (dispatch) => ({
  timeoutTrue: () => dispatch(actionTimeoutTrue()),
  timeoutFalse: () => dispatch(actionTimeoutFalse()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  timeoutFalse: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  timeout: PropTypes.bool.isRequired,
  getQuiz: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};