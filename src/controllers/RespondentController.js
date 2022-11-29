import mongoose from 'mongoose';

import Form from '../models/Form.js';

import InvariantError from '../exceptions/InvariantError.js';
import NotFoundError from '../exceptions/NotFoundError.js';

class RespondentController {
  async getRespondents(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId } = req.params;
      if (!formId) throw new InvariantError('FORM_ID_REQUIRED');

      if (!mongoose.Types.ObjectId.isValid(formId)) throw new InvariantError('INVALID_ID');

      const form = await Form.findOne({ _id: formId, owner }).populate('answers');
      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.json({
        status: 'success',
        data: {
          form,
          totalRespondents: form.answers.length,
          answers: form.answers,
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

  async getSummaries(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId } = req.params;
      if (!formId) throw new InvariantError('FORM_ID_REQUIRED');

      if (!mongoose.Types.ObjectId.isValid(formId)) throw new InvariantError('INVALID_ID');

      const form = await Form.findOne({ _id: formId, owner }).populate('answers');
      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      const summaries = form.questions.map((question) => {
        const summary = {
          type: question.type,
          question: question.question,
          answers: form.answers.map((answer) => answer[question.id]),
        };
        return summary;
      });

      return res.json({
        status: 'success',
        data: {
          summaries,
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

export default RespondentController;
