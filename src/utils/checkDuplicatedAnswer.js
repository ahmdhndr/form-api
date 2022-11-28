const checkDuplicatedAnswer = async (answers) => {
  const set = new Set();
  return answers.some((answer) => {
    if (set.has(answer.questionId)) {
      // duplicated
      return true;
    }

    set.add(answer.questionId);
    return false;
  });
};

export default checkDuplicatedAnswer;
