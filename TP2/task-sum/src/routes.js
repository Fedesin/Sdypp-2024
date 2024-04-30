import { Router } from 'express';
import { TaskController } from './controllers/task.controller.js';

export const router = Router();
const taskController = new TaskController();

router.post('/task/sum', taskController.sum);
