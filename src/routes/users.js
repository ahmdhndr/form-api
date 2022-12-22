import express from 'express';
import AuthController from '../controllers/AuthController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.get('/profile', jwtAuth(), authController.getUserProfile);

export default router;
