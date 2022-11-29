import isValidEmail from './isValidEmail.js';

const checkEmailValidation = async (questions, answers) => {
  const filteredQuestion = questions.filter((question) => {
    if (question.type === 'email') {
      const foundedAnswer = answers.find((answer) => answer.questionId === question.id.toString());
      if (!question.required) {
        if (foundedAnswer === undefined
          || foundedAnswer.value === undefined
          || foundedAnswer.value === '') return false;
      }

      if (foundedAnswer) {
        if (!isValidEmail(foundedAnswer.value)) return true;
      }
    }
    return false;
  });

  return filteredQuestion;
};

export default checkEmailValidation;
