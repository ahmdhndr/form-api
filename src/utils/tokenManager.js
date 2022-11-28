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
  verifyRefreshToken: async (refreshToken) => {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return decoded;
    } catch (error) {
      if (error.message === 'jwt expired') throw { code: 401, message: 'TOKEN_EXPIRED' };
      throw { code: 400, message: 'INVALID_REFRESH_TOKEN' };
    }
  },
  verifyAccessToken: async (accessToken) => {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      return decoded;
    } catch (error) {
      if (error.message === 'jwt expired') throw { code: 401, message: 'TOKEN_EXPIRED' };
      throw { code: 400, message: 'INVALID_ACCESS_TOKEN' };
    }
  },
};

export default tokenManager;
