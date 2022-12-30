import express from 'express';
import FormController from '../controllers/FormController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const formController = new FormController();

router.get('/forms', jwtAuth(), formController.getForms);
router.post('/forms', jwtAuth(), formController.createForm);
router.get('/forms/:formId', jwtAuth(), formController.getFormById);
router.put('/forms/:formId', jwtAuth(), formController.updateFormById);
router.delete('/forms/:formId', jwtAuth(), formController.deleteFormById);
router.get('/forms/:formId/viewForm', jwtAuth(), formController.viewForm);

export default router;
