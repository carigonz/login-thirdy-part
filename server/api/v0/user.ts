import express from 'express';
import * as userController from './get-user';
import { jwtAuth } from '../../middleware/jwtAuth';

const router = express.Router();

router.get('/me', jwtAuth, userController.getUser);

export default router;
