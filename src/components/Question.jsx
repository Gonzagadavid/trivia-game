import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuiz from '../redux/fetchs/fetchQuiz';
import fetchToken from '../redux/fetchs/fetchToken';

class Question extends Component {
  componentDidMount() {
    const { getQuiz, token } = this.props;
    console.log(token);
    const quantity = 1;
    getQuiz(token, quantity);
  }

  render() {
    const { questions, loading } = this.props;
    if (loading) { return <p>Loading...</p>; }
    return (
      <div className="question">
        <h1 data-testid="question-category">{questions[0].category}</h1>
        <p data-testid="question-text">{questions[0].question}</p>
        <div className="alternatives">
          {questions[0].incorrect_answers.map((alternative, index) => (
            <button
              type="button"
              key={ alternative }
              data-testid={ `wrong-answer${index}` }
            >
              {alternative}
            </button>
          ))}
          <button
            type="button"
            data-testid="correct-answer"
          >
            {questions[0].correct_answer}
          </button>
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
