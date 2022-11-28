const checkAnswerByOptionValue = async (questions, answers) => {
  const filteredQuestion = questions.filter((question) => {
    if (question.type === 'radio' || question.type === 'dropdown') {
      const foundedAnswer = answers.find((answer) => answer.questionId === question.id.toString());
      if (foundedAnswer) {
        const { options } = question;
        const foundedOption = options.find((option) => option.value === foundedAnswer.value);

        if (foundedOption === undefined) return true;
      }
    } else if (question.type === 'checkbox') {
      const foundedAnswer = answers.find((answer) => answer.questionId === question.id.toString());
      if (foundedAnswer) {
        return foundedAnswer.value.some((value) => {
          const { options } = question;
          const foundedOption = options.find((option) => option.value === value);

          if (foundedOption === undefined) return true;
          return false;
        });
      }
    }
    return false;
  });

  return filteredQuestion;
};

export default checkAnswerByOptionValue;
