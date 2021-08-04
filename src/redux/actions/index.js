export default fetchGravatar;
export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const getGravatar = (payload) => ({ type: FETCH_SUCCESS, payload });
export const actionGetTokenSucess = (state) => ({ type: GET_TOKEN_SUCESS, state });
export const actionGetTokenError = { type: GET_TOKEN_ERROR };
