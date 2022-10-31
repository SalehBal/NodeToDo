import { createTask, getAllTasks, deleteTask, compleateTask } from '../controllers/taskController.js';
import { protect } from '../controllers/authController.js';
import { Router } from 'express';
const router = Router();
// AUTH
router.route('/').get(protect, getAllTasks).post(protect, createTask);

router.route('/:id').delete(deleteTask).post(compleateTask);

export default router;
