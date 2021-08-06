import { fetchingQuiz, getQuiz } from '../actions';

const fetchQuiz = (token, quantity, id) => {
  const URL = `https://opentdb.com/api.php?category=${id}&amount=${quantity}&token=${token}`;
  return async (dispatch) => {
    dispatch(fetchingQuiz());
    const response = await fetch(URL);
    const { results } = await response.json();
    dispatch(getQuiz(results));
  };
};

export default fetchQuiz;
