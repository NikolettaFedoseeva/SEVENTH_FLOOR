import { Router } from 'express';
import * as AuthController from '../controllers/auth';

const router = Router();

router.post('/login', AuthController.login);
router.get('/me', AuthController.getMe);

export default router;
