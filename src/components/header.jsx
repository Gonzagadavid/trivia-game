import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import fetchGravatar from '../redux/actions';

class Header extends React.Component {
  // componentDidMount() {
  //   const { email, pushFetch } = this.props;
  //   pushFetch('string@gmail.com');
  // }

  render() {
    const { email, playerName } = this.props;
    const fechamento = md5(email.toLowerCase().trim()).toString();
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${fechamento}` } alt="" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ playerName }</p>
        <p data-testid="header-score">0</p>
      </header>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  pushFetch: (state) => dispatch(fetchGravatar(state)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  playerName: state.user.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  // pushFetch: PropTypes.func.isRequired,
};
