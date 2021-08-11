import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuestionIcons from '../components/QuestionIcons';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking">
        <div className="title-ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
          <ul className="ranking-list">
            {ranking.sort((a, b) => b.score - a.score)
              .map(({ name, score, picture }, index) => (
                <li key={ name } data-testid={ `player-name-${index}` }>
                  <img src={ picture } alt={ name } />
                  {name}
                  :
                  <span
                    data-testid={ `player-score-${index}` }
                    className="ranking-score"
                  >
                    {score}

                  </span>
                </li>
              ))}
          </ul>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar ao inicio
          </button>
        </Link>
        <QuestionIcons />
      </div>
    );
  }
}

export default Ranking;
