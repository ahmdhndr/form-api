import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const questionController = new QuestionController();

router.get('/forms/:formId/questions', jwtAuth(), questionController.getQuestionByUserId);
router.post('/forms/:formId/questions', jwtAuth(), questionController.addQuestion);
router.put('/forms/:formId/questions/:questionId', jwtAuth(), questionController.updateQuestionById);
router.delete('/forms/:formId/questions/:questionId', jwtAuth(), questionController.deleteQuestionById);

export default router;
