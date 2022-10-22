import { signup, login } from '../controllers/authController.js';
import { Router } from 'express';
const router = Router();
// AUTH
router.post('/signup', signup);
router.post('/login', login);

export default router;
