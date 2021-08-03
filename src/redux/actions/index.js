export const GET_TOKEN_SUCESS = 'GET_TOKEN_SUCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

export const actionGetTokenSucess = (state) => ({ type: GET_TOKEN_SUCESS, state });
export const actionGetTokenError = { type: GET_TOKEN_ERROR };
