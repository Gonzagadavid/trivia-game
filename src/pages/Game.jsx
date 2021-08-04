import React, { Component } from 'react';
import { Question, Header } from '../components/index';

export default class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Question />
      </>
    );
  }
}
