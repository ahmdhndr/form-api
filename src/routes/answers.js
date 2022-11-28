/* eslint-disable max-len */
import express from 'express';
import AnswerController from '../controllers/AnswerController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const answerController = new AnswerController();

router.post('/answers/:formId', jwtAuth(), answerController.addAnswer);
// router.put('/forms/:formId/questions/:questionId/options/:optionId', jwtAuth(), optionController.updateOptionById);
// router.delete('/forms/:formId/questions/:questionId/options/:optionId', jwtAuth(), optionController.deleteOptionById);

export default router;
