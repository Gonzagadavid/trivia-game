import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuiz from '../redux/fetchs/fetchQuiz';
import fetchToken from '../redux/fetchs/fetchToken';
import randomize from '../functions/randomize';

class Question extends Component {
  componentDidMount() {
    const { getQuiz, token } = this.props;
    console.log(token);
    const quantity = 1;
    getQuiz(token, quantity);
  }

  render() {
    const { questions, loading } = this.props;
    const [question] = questions;
    if (loading) { return <p>Loading...</p>; }
    const alternatives = [
      ...question.incorrect_answers.map((alt, index) => ({ correct: false, alt, index })),
      { correct: true, alt: question.correct_answer }];
    const randomIndex = randomize(alternatives.length, alternatives.length - 1);
    return (
      <div className="question">
        <h1 data-testid="question-category">{questions[0].category}</h1>
        <p data-testid="question-text">{questions[0].question}</p>
        <div className="alternatives">
          {randomIndex.map((index) => {
            const { correct, alt, index: i } = alternatives[index];
            return (
              <button
                type="button"
                key={ alt }
                data-testid={ correct ? 'correct-answer' : `wrong-answer${i}` }
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
