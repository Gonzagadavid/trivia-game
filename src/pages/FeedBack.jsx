import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
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
