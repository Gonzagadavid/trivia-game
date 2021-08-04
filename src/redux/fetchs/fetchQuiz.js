import { fetchingQuiz, getQuiz } from '../actions';

const fetchQuiz = (token, quantity) => {
  const URL = `https://opentdb.com/api.php?amount=${quantity}&token=${token}`;
  return async (dispatch) => {
    dispatch(fetchingQuiz());
    const response = await fetch(URL);
    const { results } = await response.json();
    dispatch(getQuiz(results));
  };
};

export default fetchQuiz;
