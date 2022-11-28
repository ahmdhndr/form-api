import express from 'express';
import FormController from '../controllers/FormController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const formController = new FormController();

router.get('/forms', jwtAuth(), formController.getFormByUserId);
router.post('/forms', jwtAuth(), formController.createNewForm);
router.get('/forms/:formId', jwtAuth(), formController.showFormByIdAndUserId);
router.put('/forms/:formId', jwtAuth(), formController.updateFormByIdAndUserId);
router.delete('/forms/:formId', jwtAuth(), formController.deleteFormByIdAndUserId);
router.get('/forms/:formId/viewForm', jwtAuth(), formController.viewForm);

export default router;
