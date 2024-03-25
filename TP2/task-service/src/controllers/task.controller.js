import { Task } from '../model/Task.js';

export class TaskController {
	sum = (request, response) => {
		const task = new Task();
		const result = task.sum();
		response.end(JSON.stringify({ result }));
	};
}
