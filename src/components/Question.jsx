import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    return (
      <div className="question">
        <h1 data-testid="question-category">CATEGORIA</h1>
        <p data-testid="question-text">pergunta</p>
        <div className="alternatives">
          {alternatives.map((alternative) => (
            <button
              type="button"
              key={alternative.id}
              data-testid={ `wrong-answer${index}` }
            >
              wrong answer
            </button>
          ))}
          <button
            type="button"
            data-testid="correct-answer"
          >
            correct answer
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
});

const mapDispatchToProps = (dispatch) => ({
  sendAnswer: (answer) => dispatch(sandAnswer(answer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
