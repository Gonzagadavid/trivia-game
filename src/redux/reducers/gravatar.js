const INITIAL_STATE = {
  gravatar: '',
};

const reducerGravatar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_SUCESS':
    console.log(action.payload);
    return { ...state, ...action.payload };
  default: return state;
  }
};

export default reducerGravatar;
