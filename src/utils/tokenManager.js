import jwt from 'jsonwebtoken';

const tokenManager = {
  generateAccessToken: async (payload) => jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_AGE },
  ),
  generateRefreshToken: async (payload) => jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_AGE },
  ),
  verifyAccessToken: async (accessToken) => {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      return decoded;
    } catch (error) {
      if (error.message === 'jwt expired') throw { status: 'fail', code: 401, message: 'ACCESS_TOKEN_EXPIRED' };
      throw { status: 'fail', code: 401, message: 'INVALID_ACCESS_TOKEN' };
    }
  },
  verifyRefreshToken: async (refreshToken) => {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return decoded;
    } catch (error) {
      if (error.message === 'jwt expired') throw { status: 'fail', code: 401, message: 'REFRESH_TOKEN_EXPIRED' };
      throw { status: 'fail', code: 401, message: 'INVALID_REFRESH_TOKEN' };
    }
  },
};

export default tokenManager;
