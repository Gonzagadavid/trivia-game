import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">feed back</p>
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
