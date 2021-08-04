import md5 from 'crypto-js/md5';

const getGravatar = (payload) => ({
  type: 'FETCH_SUCESS',
  payload,
});

const fetchGravatar = (hash) => {
  const fechamento = md5(hash.toLowerCase().trim()).toString();
  return (dispatch) => {
    fetch(`https://www.gravatar.com/avatar/${fechamento}`)
      .then((response) => response.json())
      .then((response2) => console.log(response2))
      .then((resolve) => dispatch(getGravatar(resolve)))
      .catch((err) => console.log(err));
  };
};

export default fetchGravatar;
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

export const actionGetTokenSucess = (state) => ({ type: GET_TOKEN_SUCESS, state });
export const actionGetTokenError = { type: GET_TOKEN_ERROR };
