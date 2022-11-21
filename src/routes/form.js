import express from 'express';
import FormController from '../controllers/FormController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const formController = new FormController();

router.get('/forms', jwtAuth(), formController.getFormByUserId);
router.post('/forms', jwtAuth(), formController.createNewForm);
router.get('/forms/:id', jwtAuth(), formController.showFormByIdAndUserId);
router.put('/forms/:id', jwtAuth(), formController.updateFormByIdAndUserId);
router.delete('/forms/:id', jwtAuth(), formController.deleteFormByIdAndUserId);

export default router;
