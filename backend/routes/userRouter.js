import { signup, login, loginAutomatically } from '../controllers/authController.js';
import multer from 'multer';
import { Router } from 'express';
const router = Router();
// AUTH
router.post('/signup', signup);
router.post('/login', login);
router.get('/loginAutomatically', loginAutomatically);

export default router;
