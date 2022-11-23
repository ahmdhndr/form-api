import mongoose from 'mongoose';

import Form from '../models/Form.js';

class OptionController {
  async addOption(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId, questionId } = req.params;
      const { option } = req.body;

      if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(questionId)) throw { code: 400, message: 'INVALID_ID' };

      if (!option) throw { code: 400, message: 'PROPERTY_REQUIRED' };

      const newOption = {
        id: mongoose.Types.ObjectId(),
        value: option,
      };

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $push: { 'questions.$[indexQuestion].options': newOption } },
        {
          arrayFilters: [{ 'indexQuestion.id': mongoose.Types.ObjectId(questionId) }],
          new: true,
        },
      );

      if (!form) throw { code: 404, message: 'FORM_NOT_FOUND' };

      return res.status(201).json({
        status: 'success',
        message: 'OPTION_ADDED',
        data: {
          addedOption: newOption,
        },
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({
          status: error.code ? 'fail' : 'error',
          message: error.message || 'Terjadi kegagalan pada server',
        });
    }
  }

  async updateOptionById(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId, questionId, optionId } = req.params;
      const { option } = req.body;

      if (!mongoose.Types.ObjectId.isValid(formId)
        || !mongoose.Types.ObjectId.isValid(questionId)
        || !mongoose.Types.ObjectId.isValid(optionId)
      ) throw { code: 400, message: 'INVALID_ID' };

      if (!option) throw { code: 400, message: 'PROPERTY_REQUIRED' };

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $set: { 'questions.$[indexQuestion].options.$[indexOption].value': option } },
        {
          arrayFilters: [
            { 'indexQuestion.id': mongoose.Types.ObjectId(questionId) },
            { 'indexOption.id': mongoose.Types.ObjectId(optionId) },
          ],
          new: true,
        },
      );

      if (!form) throw { code: 404, message: 'FORM_NOT_FOUND' };

      return res.json({
        status: 'success',
        message: 'OPTION_UPDATED',
        data: {
          updatedOption: {
            id: optionId,
            value: option,
          },
        },
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({
          status: error.code ? 'fail' : 'error',
          message: error.message || 'Terjadi kegagalan pada server',
        });
    }
  }

  async deleteOptionById(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId, questionId, optionId } = req.params;

      if (!optionId) throw { code: 404, message: 'QUESTION_NOT_FOUND' };

      if (!mongoose.Types.ObjectId.isValid(formId)
        || !mongoose.Types.ObjectId.isValid(questionId)
        || !mongoose.Types.ObjectId.isValid(optionId)
      ) throw { code: 400, message: 'INVALID_ID' };

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

      if (!form) throw { code: 404, message: 'FORM_NOT_FOUND' };

      return res.json({
        status: 'success',
        message: 'OPTION_DELETED',
        data: {
          form,
        },
      });
    } catch (error) {
      return res
        .status(error.code || 500)
        .json({
          status: error.code ? 'fail' : 'error',
          message: error.message || 'Terjadi kegagalan pada server',
        });
    }
  }
}

export default OptionController;
