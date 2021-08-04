import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Header from './components/header';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
