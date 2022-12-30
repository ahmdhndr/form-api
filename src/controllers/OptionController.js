import mongoose from 'mongoose';

import Form from '../models/Form.js';

import InvariantError from '../exceptions/InvariantError.js';
import NotFoundError from '../exceptions/NotFoundError.js';

class OptionController {
  async addOption(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId, questionId } = req.params;
      const { optValue } = req.body;

      if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(questionId)) throw new InvariantError('INVALID_ID');

      if (!optValue) throw new InvariantError('PROPERTY_REQUIRED');

      const newOption = {
        id: mongoose.Types.ObjectId(),
        value: optValue,
      };

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $push: { 'questions.$[indexQuestion].options': newOption } },
        {
          arrayFilters: [{ 'indexQuestion.id': mongoose.Types.ObjectId(questionId) }],
          new: true,
        },
      );

      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.status(201).json({
        status: 'success',
        message: 'OPTION_ADDED',
        data: {
          addedOption: newOption,
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

  async updateOptionById(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId, questionId, optionId } = req.params;
      const { optValue } = req.body;

      if (!mongoose.Types.ObjectId.isValid(formId)
        || !mongoose.Types.ObjectId.isValid(questionId)
        || !mongoose.Types.ObjectId.isValid(optionId)
      ) throw new InvariantError('INVALID_ID');

      if (!optValue) throw new InvariantError('PROPERTY_REQUIRED');

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $set: { 'questions.$[indexQuestion].options.$[indexOption].value': optValue } },
        {
          arrayFilters: [
            { 'indexQuestion.id': mongoose.Types.ObjectId(questionId) },
            { 'indexOption.id': mongoose.Types.ObjectId(optionId) },
          ],
          new: true,
        },
      );

      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.json({
        status: 'success',
        message: 'OPTION_UPDATED',
        data: {
          updatedOption: {
            id: optionId,
            value: optValue,
          },
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

  async deleteOptionById(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId, questionId, optionId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(formId)
        || !mongoose.Types.ObjectId.isValid(questionId)
        || !mongoose.Types.ObjectId.isValid(optionId)
      ) throw new InvariantError('INVALID_ID');

      if (!optionId) throw new NotFoundError('OPTION_NOT_FOUND');

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $pull: { 'questions.$[indexQuestion].options': { id: mongoose.Types.ObjectId(optionId) } } },
        {
          arrayFilters: [
            { 'indexQuestion.id': mongoose.Types.ObjectId(questionId) },
          ],
          new: true,
        },
      );

      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.json({
        status: 'success',
        message: 'OPTION_DELETED',
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

export default OptionController;
