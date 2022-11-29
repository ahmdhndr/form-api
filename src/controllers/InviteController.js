import mongoose from 'mongoose';

import Form from '../models/Form.js';
import User from '../models/User.js';

import isValidEmail from '../utils/isValidEmail.js';

import NotFoundError from '../exceptions/NotFoundError.js';
import InvariantError from '../exceptions/InvariantError.js';

class InviteController {
  async getInvitedEmail(req, res) {
    const { id: owner } = req.user;
    const { formId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(formId)) throw new InvariantError('INVALID_ID');

    const { invites } = await Form.findOne({ _id: formId, owner }).select('invites');

    return res.json({
      status: 'success',
      message: 'INVITED_EMAIL',
      data: {
        invites,
      },
    });
  }

  async inviteUserByEmail(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId } = req.params;
      const { email } = req.body;
      if (!email) throw new InvariantError('PROPERTY_REQUIRED');

      if (!mongoose.Types.ObjectId.isValid(formId)) throw new InvariantError('INVALID_ID');

      if (!isValidEmail(email)) throw new InvariantError('INVALID_EMAIL');

      // check if owner try to invite him/her self
      const user = await User.findOne({ email });
      if (!user) throw new InvariantError('USER_NOT_FOUND');
      if (user.id.toString() === owner) throw new InvariantError('CAN\'T_INVITE_FORM_OWNER_EMAIL');

      // check if email already invited
      const emailAlreadyInvited = await Form
        .findOne({ _id: formId, owner, invites: { $in: email } });
      if (emailAlreadyInvited) throw new InvariantError('EMAIL_ALREADY_INVITED');

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $push: { invites: email } },
        { new: true },
      );

      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.status(201).json({
        status: 'success',
        message: 'EMAIL_INVITED',
        data: {
          invitedEmail: email,
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

  async deleteInvitedUser(req, res) {
    try {
      const { id: owner } = req.user;
      const { formId } = req.params;
      const { email } = req.body;
      if (!email) throw new InvariantError('PROPERTY_REQUIRED');

      if (!mongoose.Types.ObjectId.isValid(formId)) throw new InvariantError('INVALID_ID');

      // email validation
      const regex = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/;
      if (!regex.test(email)) throw new InvariantError('INVALID_EMAIL');

      const user = await User.findOne({ email });
      if (!user) throw new InvariantError('USER_NOT_FOUND');
      if (user.id.toString() === owner) throw new InvariantError('CAN\'T_DELETE_FORM_OWNER_EMAIL');

      const form = await Form.findOneAndUpdate(
        { _id: formId, owner },
        { $pull: { invites: email } },
        { new: true },
      );

      if (!form) throw new NotFoundError('FORM_NOT_FOUND');

      return res.json({
        status: 'success',
        message: 'EMAIL_DELETED',
        data: {
          deletedEmail: email,
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

export default InviteController;
