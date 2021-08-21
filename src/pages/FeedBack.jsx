import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GraphicComponent } from 'stylized-graphic-component';
import Header from '../components/Header';
import style from '../assets/feedbackGraph';

class FeedBack extends Component {
  render() {
    const { player: { assertions, score, amount } } = JSON
      .parse(localStorage.getItem('state'));
    const three = 3;
    return (
      <div className="feedback-container">
        <Header />
        <p className="feedback-assertions">
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          perguntas.
        </p>
        <p className="feedback-text" data-testid="feedback-text">
          {assertions < three ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
        <p className="feedback-score" data-testid="feedback-total-score">{score}</p>
        <GraphicComponent
          style={ style }
          data={ { Assertions: assertions, Errors: amount - assertions } }
          maxPercent="100%"
          colors={ ['#76b041', '#db3a34'] }
        />
        <div className="buttons">
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default FeedBack;
