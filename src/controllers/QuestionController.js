/* eslint-disable no-prototype-builtins */
import mongoose from 'mongoose';

import Form from '../models/Form.js';

import NotFoundError from '../exceptions/NotFoundError.js';
import InvariantError from '../exceptions/InvariantError.js';

const allowedTypes = ['text', 'radio', 'checkbox', 'dropdown', 'email'];

class QuestionController {
  async getQuestionByUserId(req, res) {
    try {
      const { formId } = req.params;
      const { id: owner } = req.user;

      const form = await Form.findOne({ _id: formId, owner });
      if (!form) throw new NotFoundError('FORM_NOT_FOUND');
      const { questions } = form;

      return res.json({
        status: 'success',
        data: {
          questions,
        },
      });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({
          status: error.statusCode ? 'fail' : 'error',
          message: error.message || 'Terjadi kegagalan pada server',
        });
    }
  }

  async addQuestion(req, res) {
    try {
      const { formId } = req.params;
      const { id: owner } = req.user;
      const { question, type, required } = req.body;

      if (!mongoose.Types.ObjectId.isValid(formId)) throw new InvariantError('INVALID_ID');
      if (!allowedTypes.includes(type)) throw new InvariantError('INVALID_QUESTION_TYPE');

      const newQuestion = {
        id: mongoose.Types.ObjectId(),
        question: question || 'Untitled question',
        type: type || 'text',
        required: required || false,
        options: [],
      };

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $push: { questions: newQuestion } },
        { new: true },
      );

      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.status(201).json({
        status: 'success',
        message: 'QUESTION_ADDED',
        data: {
          addedQuestion: newQuestion,
        },
      });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({
          status: error.statusCode ? 'fail' : 'error',
          message: error.message || 'Terjadi kegagalan pada server',
        });
    }
  }

  async updateQuestionById(req, res) {
    try {
      const { formId, questionId } = req.params;
      const { id: owner } = req.user;
      const { question, type, required } = req.body;

      if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(questionId)) throw new InvariantError('INVALID_ID');

      const field = {};
      if (req.body.hasOwnProperty('question')) {
        field['questions.$[indexQuestion].question'] = question;
      } else if (req.body.hasOwnProperty('type')) {
        if (!allowedTypes.includes(type)) throw new InvariantError('INVALID_QUESTION_TYPE');
        field['questions.$[indexQuestion].type'] = type;
      } else if (req.body.hasOwnProperty('required')) {
        field['questions.$[indexQuestion].required'] = required;
      }

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $set: field },
        {
          arrayFilters: [{ 'indexQuestion.id': mongoose.Types.ObjectId(questionId) }],
          new: true,
        },
      );

      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.json({
        status: 'success',
        message: 'QUESTION_UPDATED',
        data: {
          form,
        },
      });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({
          status: error.statusCode ? 'fail' : 'error',
          message: error.message || 'Terjadi kegagalan pada server',
        });
    }
  }

  async deleteQuestionById(req, res) {
    try {
      const { formId, questionId } = req.params;
      const { id: owner } = req.user;

      if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(questionId)) throw new InvariantError('INVALID_ID');

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $pull: { questions: { id: mongoose.Types.ObjectId(questionId) } } },
        { new: true },
      );

      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.json({
        status: 'success',
        message: 'QUESTION_DELETED',
        data: {
          form,
        },
      });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({
          status: error.statusCode ? 'fail' : 'error',
          message: error.message || 'Terjadi kegagalan pada server',
        });
    }
  }
}

export default QuestionController;
