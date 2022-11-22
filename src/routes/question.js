import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const questionController = new QuestionController();

router.get('/forms/:formId/questions', jwtAuth(), questionController.getQuestionByUserId);
router.post('/forms/:formId/questions', jwtAuth(), questionController.addQuestion);
// router.get('/forms/:id', jwtAuth(), questionController.showFormByIdAndUserId);
router.put('/forms/:formId/questions/:questionId', jwtAuth(), questionController.updateQuestion);
router.delete('/forms/:formId/questions/:questionId', jwtAuth(), questionController.deleteQuestion);

export default router;
