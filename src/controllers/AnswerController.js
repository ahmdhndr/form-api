import mongoose from 'mongoose';

import Answer from '../models/Answer.js';
import Form from '../models/Form.js';

import InvariantError from '../exceptions/InvariantError.js';

import checkAnswerByOptionValue from '../utils/checkAnswerByOptionValue.js';
import checkDuplicatedAnswer from '../utils/checkDuplicatedAnswer.js';
import checkEmptyAnswerOnRequiredQuestion from '../utils/checkEmptyAnswerOnRequiredQuestion.js';
import checkQuestionIdOnAnswerQstId from '../utils/checkQuestionIdOnAnswerQstId.js';
import checkEmailValidation from '../utils/checkEmailValidation.js';

class AnswerController {
  async addAnswer(req, res) {
    try {
      const { formId } = req.params;
      const { id: owner } = req.user;
      const { answers } = req.body;
      if (!answers) throw new InvariantError('PROPERTY_REQUIRED');

      const { questions } = await Form.findById(formId).select('questions');

      const isEmptyAnswer = await checkEmptyAnswerOnRequiredQuestion(questions, answers);
      if (isEmptyAnswer.length > 0) throw new InvariantError('REQUIRED_QUESTION_EMPTY_ANSWER', { question: isEmptyAnswer[0].qnValue });

      const isDuplicatedAswer = await checkDuplicatedAnswer(answers);
      if (isDuplicatedAswer) throw new InvariantError('DUPLICATED_ANSWER');

      const checkAnswerByOpt = await checkAnswerByOptionValue(questions, answers);
      if (checkAnswerByOpt.length > 0) throw new InvariantError('ANSWER_NOT_MATCH_OPTION_VALUE', { question: checkAnswerByOpt[0].qnValue });

      const checkAnswerQstId = await checkQuestionIdOnAnswerQstId(questions, answers);
      if (checkAnswerQstId.length > 0) throw new InvariantError('QUESTION_ID_NOT_EXIST', { questionId: checkAnswerQstId[0].questionId });

      const isNotValidEmail = await checkEmailValidation(questions, answers);
      if (isNotValidEmail.length > 0) throw new InvariantError('INVALID_EMAIL', { question: isNotValidEmail[0].qnValue });

      if (!mongoose.Types.ObjectId.isValid(formId)) throw { code: 400, message: 'INVALID_ID' };

      const fields = {};
      // eslint-disable-next-line no-return-assign
      answers.forEach((answer) => fields[answer.questionId] = answer.value);

      const newAnswer = await Answer.create({
        formId,
        owner,
        ...fields,
      });

      return res.status(201).json({
        status: 'success',
        message: 'ANSWER_ADDED',
        data: {
          addedAnswer: newAnswer,
        },
      });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({
          status: error.statusCode ? 'fail' : 'error',
          message: error.message || 'Terjadi kegagalan pada server',
          part: error.part || {},
        });
    }
  }
}

export default AnswerController;
