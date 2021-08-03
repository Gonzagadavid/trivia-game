import { GET_TOKEN_ERROR, GET_TOKEN_SUCESS } from '../actions';

const INITIAL_STATE = {
  token: '',
  errorToken: '',
  name: '',
  email: '',
};

const reducerUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN_SUCESS:
    return { ...state, ...action.state, errorToken: '' };

  case GET_TOKEN_ERROR:
    return { ...state, error: 'Ocorreu um erro com a requisição do token' };

  default: return state;
  }
};

export default reducerUser;
