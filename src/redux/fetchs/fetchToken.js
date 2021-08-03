import { actionGetTokenError, actionGetTokenSucess } from '../actions';

const fetchToken = ({ email, playerName: name }) => async (dispatch) => {
  const resp = await fetch('https://opentdb.com/api_token.php?command=request');
  if (!resp.ok) return dispatch(actionGetTokenError);
  const respObject = await resp.json();
  const { token } = respObject;
  const player = JSON.parse(localStorage.getItem('player'));
  localStorage.setItem('player', JSON.stringify({ ...player, name }));
  localStorage.setItem('token', JSON.stringify(token));
  dispatch(actionGetTokenSucess({ token, name, email }));
};

export default fetchToken;
