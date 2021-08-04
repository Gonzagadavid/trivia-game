import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import InputCard from '../components/InputCard';
import fetchToken from '../redux/fetchs/fetchToken';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      playerName: '',
      validation: true,
    };
    this.onHandlerChange = this.onHandlerChange.bind(this);
    this.onValidation = this.onValidation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { getToken } = this.props;
    getToken({ email, playerName });
  }

  render() {
    const { email, playerName, validation } = this.state;
    return (
      <form onSubmit={ this.onSubmit }>
        <InputCard
          labelText="Nome:"
          id="input-player-name"
          name="playerName"
          type="text"
          value={ playerName }
          onChange={ this.onHandlerChange }
        />
        <InputCard
          labelText="Email:"
          id="input-gravatar-email"
          name="email"
          type="texto"
          value={ email }
          onChange={ this.onHandlerChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ validation }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Settings
          </button>
        </Link>
      </form>
    );
  }
}

const mapDipatchToProps = (dispatch) => ({
  getToken: (data) => dispatch(fetchToken(data)),
});

export default connect(null, mapDipatchToProps)(Login);

Login.propTypes = {
  getToken: func.isRequired,
};
