import express from 'express';
import RespondentController from '../controllers/RespondentController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const respondentController = new RespondentController();

router.get('/forms/:formId/respondents', jwtAuth(), respondentController.getRespondents);
router.get('/forms/:formId/summaries', jwtAuth(), respondentController.getSummaries);

export default router;
