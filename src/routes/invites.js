import express from 'express';
import InviteController from '../controllers/InviteController.js';
import jwtAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const inviteController = new InviteController();

router.get('/forms/:formId/invites', jwtAuth(), inviteController.getInvitedEmail);
router.post('/forms/:formId/invites', jwtAuth(), inviteController.inviteUserByEmail);
router.delete('/forms/:formId/invites', jwtAuth(), inviteController.deleteInvitedUser);

export default router;
