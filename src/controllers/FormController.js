import mongoose from 'mongoose';
import Form from '../models/Form.js';

class FormController {
  async getFormByUserId(req, res) {
    try {
      const { id: owner } = req.user;

      const customLabels = {
        totalDocs: 'itemCount',
        docs: 'itemsList',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
      };
      const options = {
        limit: parseInt(req.query.limit, 10) || 10,
        page: parseInt(req.query.page, 10) || 1,
        customLabels,
      };

      const forms = await Form.paginate({ owner }, options);

      return res.json({
        status: 'success',
        data: {
          forms,
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

  async createNewForm(req, res) {
    try {
      const { id: owner } = req.user;
      const { title, description } = req.body;
      const newForm = await Form.create({
        owner,
        title,
        description,
      });

      return res.status(201).json({
        status: 'success',
        message: 'FORM_CREATED',
        data: {
          addedForm: {
            _id: newForm._id,
            title: title || 'untitled form',
            owner: req.user.email,
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

  async showFormByIdAndUserId(req, res) {
    try {
      const { formId } = req.params;
      const { id: owner } = req.user;

      if (!mongoose.Types.ObjectId.isValid(formId)) throw { code: 400, message: 'INVALID_ID' };

      const form = await Form.findOne({ _id: formId, owner });
      if (!form) throw { code: 404, message: 'FORM_NOT_FOUND' };

      return res.json({
        status: 'success',
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

  async updateFormByIdAndUserId(req, res) {
    try {
      const { formId } = req.params;
      const { id: owner } = req.user;

      if (!mongoose.Types.ObjectId.isValid(formId)) throw { code: 400, message: 'INVALID_ID' };

      const form = await Form.findOneAndUpdate({ _id: formId, owner }, req.body, { new: true });
      if (!form) throw { code: 404, message: 'FORM_NOT_FOUND' };

      return res.json({
        status: 'success',
        message: 'FORM_UPDATED',
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

  async deleteFormByIdAndUserId(req, res) {
    try {
      const { formId } = req.params;
      const { id: owner } = req.user;

      if (!mongoose.Types.ObjectId.isValid(formId)) throw { code: 400, message: 'INVALID_ID' };

      const form = await Form.findOneAndDelete({ _id: formId, owner });
      if (!form) throw { code: 404, message: 'FORM_NOT_FOUND' };

      return res.json({
        status: 'success',
        message: 'FORM_DELETED',
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

export default FormController;
