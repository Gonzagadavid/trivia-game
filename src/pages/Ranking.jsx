import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <ul>
        {ranking.map(({ name, score, picture }, index) => (
          <li key={ name } data-index={ `player-name-${index}` }>
            <img src={ picture } alt={ name } />
            {name}
            :
            {' '}
            <span data-testid={ `player-score-${index}` }>{score}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default Ranking;
