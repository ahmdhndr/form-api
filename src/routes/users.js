import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/login', authController.refreshToken);

export default router;
