const checkEmailValidation = async (questions, answers) => {
  const filteredQuestion = questions.filter((question) => {
    if (question.type === 'email') {
      const foundedAnswer = answers.find((answer) => answer.questionId === question.id.toString());
      if (question.required) {
        if (foundedAnswer) {
          const regex = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/;
          if (regex.test(foundedAnswer.value) === false) {
            return true;
          }
        }
      }
    }
    return false;
  });

  return filteredQuestion;
};

export default checkEmailValidation;
