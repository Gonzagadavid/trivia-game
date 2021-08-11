import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const three = 3;
    return (
      <div className="feedback-container">
        <Header />
        <p className="feedback-score">
          Você acertou
          {' '}
          <span>{assertions}</span>
          {' '}
          perguntas.
        </p>
        <p className="feedback-text" data-testid="feedback-text">
          {assertions < three ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default FeedBack;
