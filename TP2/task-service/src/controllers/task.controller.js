import { Task } from '../model/Task.js';

export class TaskController {
	

	sum = (request, response) => {
		const task = new Task();

		const body = request.body;

		const params = body.params;

		const result = task.sum(params);
		response.end(JSON.stringify({ result }));
	};

}
