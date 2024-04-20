import { Task } from '../model/Task.js';

export class TaskController {
	sum = (request, response) => {
		console.log('Realizando suma');
		const task = new Task();

		const body = request.body;

		const params = body.params;

		const result = task.sum(params);
		console.log('Sum result: ', result);
		response.end(JSON.stringify({ result }));
	};
}
