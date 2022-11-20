import jwt from 'jsonwebtoken';

const TokenManager = {
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
      // eslint-disable-next-line no-throw-literal
      throw { code: 400, message: 'INVALID_REFRESH_TOKEN' };
    }
  },
  verifyAccessToken: async (accessToken) => {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      return decoded;
    } catch (error) {
      // eslint-disable-next-line no-throw-literal
      throw { code: 400, message: 'INVALID_ACCESS_TOKEN' };
    }
  },
};

export default TokenManager;
