import { Router } from 'express';
import { TaskController } from './controllers/task.controller.js';

export const router = Router();
const taskController = new TaskController();

router.post('/api/execute', taskController.executeGenericTask);
router.get('/api/status', (request, response) => {
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(
		JSON.stringify({
			time: new Date().toISOString(),
			service: 'Servidor HTTP - Generic task server',
			status: 'OK',
			message: 'Servidor funcionando correctamente',
		})
	);
});
