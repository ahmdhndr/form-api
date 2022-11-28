import tokenManager from '../utils/tokenManager.js';

// eslint-disable-next-line consistent-return
const jwtAuth = () => async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw { code: 401, message: 'UNAUTHORIZED' };
    // eslint-disable-next-line prefer-destructuring
    const token = req.headers.authorization.split(' ')[1];

    const decoded = await tokenManager.verifyAccessToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(error.code || 500)
      .json({
        status: error.code ? 'fail' : 'error',
        message: error.message || 'Terjadi kegagalan pada server',
      });
  }
};

export default jwtAuth;
