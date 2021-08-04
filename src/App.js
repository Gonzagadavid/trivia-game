import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Header from './components/Header';
import Question from './components/Question';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/quiz" component={ Question } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
