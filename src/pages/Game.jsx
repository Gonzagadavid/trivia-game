import React, { Component } from 'react';
import { Question, Header, Timer } from '../components/index';

export default class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Timer />
        <Question />
      </>
    );
  }
}
