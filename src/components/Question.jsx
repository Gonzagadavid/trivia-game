import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuiz from '../redux/fetchs/fetchQuiz';
import fetchToken from '../redux/fetchs/fetchToken';
import randomize from '../functions/randomize';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCorrect: false,
    };
    this.changeBorder = this.changeBorder.bind(this);
  }

  componentDidMount() {
    const { getQuiz, token } = this.props;
    console.log(token);
    const quantity = 1;
    getQuiz(token, quantity);
  }

  changeBorder() {
    this.setState({
      showCorrect: true,
    });
  }

  render() {
    const { questions, loading } = this.props;
    const [question] = questions;
    const { showCorrect } = this.state;
    if (loading) { return <p>Loading...</p>; }
    const alternatives = [
      ...question.incorrect_answers
        .map((alt, index) => ({ correct: false, alt, index, isCorrect: 'wrong-answer' })),
      { correct: true, alt: question.correct_answer, isCorrect: 'correct-border' }];
    const randomIndex = randomize(alternatives.length, alternatives.length - 1);
    return (
      <div className="question">
        <h1 data-testid="question-category">{question.category}</h1>
        <p data-testid="question-text">{question.question}</p>
        <div className="alternatives">
          {randomIndex.map((index) => {
            const { correct, alt, index: i, isCorrect } = alternatives[index];
            return (
              <button
                type="button"
                key={ alt }
                data-testid={ correct ? 'correct-answer' : `wrong-answer${i}` }
                className={ showCorrect ? isCorrect : '' }
                onClick={ this.changeBorder }
              >
                {alt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.quiz.questions,
  loading: state.quiz.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuiz: (token, quantity) => dispatch(fetchQuiz(token, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
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
