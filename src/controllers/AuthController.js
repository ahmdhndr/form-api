import bcrypt from 'bcrypt';

import User from '../models/User.js';

import InvariantError from '../exceptions/InvariantError.js';
import AuthenticationError from '../exceptions/AuthenticationError.js';

import tokenManager from '../utils/tokenManager.js';

class AuthController {
  async register(req, res) {
    try {
      const { fullname, email, password } = req.body;

      if (!fullname || !email || !password) throw new InvariantError('PROPERTY_REQUIRED');

      if (password.length < 6) throw new InvariantError('PASSWORD_MINIMUM_6_CHARACTERS');

      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) throw new InvariantError('EMAIL_ALREADY_EXIST');

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        status: 'success',
        data: {
          addedUser: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
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

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new InvariantError('PROPERTY_REQUIRED');

      const user = await User.findOne({ email });
      if (!user) throw new InvariantError('USER_NOT_FOUND');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new AuthenticationError('INVALID_PASSWORD');

      const accessToken = await tokenManager.generateAccessToken({ id: user._id, email });
      const refreshToken = await tokenManager.generateRefreshToken({ id: user._id, email });

      return res.status(201).json({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
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

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw new InvariantError('PROPERTY_REQUIRED');

      const { id, email } = await tokenManager.verifyRefreshToken(refreshToken);

      const accessToken = await tokenManager.generateAccessToken({ id, email });

      return res.json({
        status: 'success',
        data: {
          accessToken,
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

export default AuthController;
