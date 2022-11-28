import express from 'express';
import OptionController from '../controllers/OptionController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const optionController = new OptionController();

router.post('/forms/:formId/questions/:questionId/options', jwtAuth(), optionController.addOption);
router.put('/forms/:formId/questions/:questionId/options/:optionId', jwtAuth(), optionController.updateOptionById);
router.delete('/forms/:formId/questions/:questionId/options/:optionId', jwtAuth(), optionController.deleteOptionById);

export default router;
