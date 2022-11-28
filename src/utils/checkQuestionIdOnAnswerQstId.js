const checkQuestionIdOnAnswerQstId = async (questions, answers) => {
  const filteredAnswer = answers.filter((answer) => {
    const answerQuestionId = questions
      .some((question) => answer.questionId === question.id.toString());
    if (answerQuestionId === false) return true;
    return false;
  });

  return filteredAnswer;
};

export default checkQuestionIdOnAnswerQstId;
