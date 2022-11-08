import { createTask, getAllTasks, deleteTask, compleateTask, failTask } from '../controllers/taskController.js';
import { protect } from '../controllers/authController.js';
import { Router } from 'express';
const router = Router();
// AUTH
router.route('/').get(protect, getAllTasks).post(protect, createTask);

router.route('/:id').delete(protect, deleteTask).patch(protect, compleateTask);

router.route('/taskfail/:id').patch(protect, failTask);
router.route('/taskdone/:id').patch(protect, failTask);

export default router;
