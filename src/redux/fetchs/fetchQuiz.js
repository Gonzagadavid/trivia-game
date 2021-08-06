import { fetchingQuiz, getQuiz } from '../actions';

const decodeResults = (questions) => {
  const decoded = questions
    .map(({
      category,
      type,
      difficulty,
      question,
      correct_answer: correct,
      incorrect_answers: incorrects,
    }) => ({
      category: atob(category),
      type: atob(type),
      difficulty: atob(difficulty),
      question: atob(question),
      correct_answer: atob(correct),
      incorrect_answers: incorrects.map((incorrect) => atob(incorrect)),
    }));
  return decoded;
};

const fetchQuiz = (token, quantity, id) => {
  const URL = `https://opentdb.com/api.php?category=${id}&amount=${quantity}&token=${token}&encode=base64`;
  return async (dispatch) => {
    dispatch(fetchingQuiz());
    const response = await fetch(URL);
    const { results } = await response.json();
    dispatch(getQuiz(decodeResults(results)));
  };
};

export default fetchQuiz;
