import { FETCHING_QUIZ, GET_QUIZ } from '../actions';

const INITIAL_STATE = {
  questions: [],
  loading: true,
};

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCHING_QUIZ:
    return { ...state, loading: true };
  case GET_QUIZ:
    return { ...state, loading: false, questions: action.payload };
  default:
    return state;
  }
};

export default quizReducer;
