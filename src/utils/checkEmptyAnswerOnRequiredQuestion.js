const checkEmptyAnswerOnRequiredQuestion = async (questions, answers) => {
  const filteredQuestion = questions.filter((question) => {
    if (question.required) {
      const foundedAnswer = answers
        .find((answer) => answer.questionId === question.id.toString());
      if (foundedAnswer === undefined
        || foundedAnswer.value === undefined
        || foundedAnswer.value === '') {
        return true;
      }
    }
    return false;
  });

  return filteredQuestion;
};

export default checkEmptyAnswerOnRequiredQuestion;
