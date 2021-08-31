import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func, string, number } from 'prop-types';
import InputCard from '../components/InputCard';
import fetchToken from '../redux/fetchs/fetchToken';
import { actionSaveDataUser } from '../redux/actions';
import QuestionIcons from '../components/QuestionIcons';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      playerName: '',
      validation: true,
      redirect: false,
    };
    this.onHandlerChange = this.onHandlerChange.bind(this);
    this.onValidation = this.onValidation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  onValidation() {
    const min = 3;
    const { email, playerName } = this.state;
    const validation = !(/\w+@\w+.com/.test(email)
     && playerName.length > min
     && (/[A-z\s]+/).test(playerName));
    this.setState({ validation });
  }

  onHandlerChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.onValidation());
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, playerName } = this.state;
    const { saveUser, amount } = this.props;
    saveUser({ email, playerName });
    this.setState({ redirect: true });
    const state = JSON.parse(localStorage.getItem('state')) || {};
    localStorage.setItem(
      'state',
      JSON.stringify({
        player: {
          ...state.player,
          name: playerName,
          gravatarEmail: email,
          score: 0,
          assertions: 0,
          amount,
        },
      }),
    );
  }

  render() {
    const { token } = this.props;
    const { email, playerName, validation, redirect } = this.state;
    if (redirect && token) { return <Redirect to="/game" />; }
    if (window.matchMedia('(max-width: 768px)').matches) {
      return (
        <>
          <QuestionIcons />
          <p className="mobile">
            Entre pelo desktop para visualizar esta aplicação
          </p>
        </>
      );
    }
    return (
      <div className="login">
        <img className="logo" src="./images/trivia.png" alt="trivia logo" />
        <Link to="/settings">
          <button
            className="config-btn"
            data-testid="btn-settings"
            type="button"
          >
            <i className="fas fa-cog" />
          </button>
        </Link>
        <form className="login-form" onSubmit={ this.onSubmit }>
          <InputCard
            labelText="Nome"
            id="input-player-name"
            name="playerName"
            value={ playerName }
            onChange={ this.onHandlerChange }
          />
          <InputCard
            labelText="Email"
            id="input-gravatar-email"
            name="email"
            type="texto"
            value={ email }
            onChange={ this.onHandlerChange }
          />
          <div className="buttons">
            <button
              className="login-btn"
              data-testid="btn-play"
              type="submit"
              disabled={ validation }
            >
              Jogar
            </button>
          </div>
        </form>
        <QuestionIcons />
      </div>
    );
  }
}

const mapDipatchToProps = (dispatch) => ({
  getToken: (data) => dispatch(fetchToken(data)),
  saveUser: (data) => dispatch(actionSaveDataUser(data)),

});

const mapStateToProps = (state) => ({
  token: state.user.token,
  amount: state.user.amount,
});

export default connect(mapStateToProps, mapDipatchToProps)(Login);

Login.propTypes = {
  getToken: func.isRequired,
  saveUser: func.isRequired,
  token: string.isRequired,
  amount: number.isRequired,
};
