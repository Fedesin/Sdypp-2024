import { Task } from '../model/Task.js';

export class TaskController {
	multiplication = (request, response) => {
		console.log('Realizando multiplicación');
		const task = new Task();

		const body = request.body;

		const params = body.params;

		const result = task.multiplication(params);
		console.log('Multiplication result: ', result);
		response.end(JSON.stringify({ 'Multiplication result': result }));
	};
}
