import { DockerClient } from '../utils/docker-client.js';

export class TaskController {
	executeGenericTask = async (request, response) => {
		const docker = new DockerClient();

		const { body } = request;
		const { image, port, tag, task, params } = body;

		await docker.pull(image);
		await docker.run(image, tag, port);

		// Enviar petición HTTP para que la tarea se ejecute con los parámetros (task, params).
		try {
			const name = `task-${port}`;
			// const address = await docker.getIPByName(name);
			const res = await fetch(`http://${name}:${port}/task/${task}`, {
				method: 'POST',
				body: JSON.stringify({ params }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			const result = data.result;
			response.status(200);
			response.end(
				JSON.stringify({
					message: `Tarea ${task} ejecutada exitosamente`,
					result,
				})
			);
		} catch (error) {
			response.status(400);
			response.end(
				JSON.stringify({
					message: `Error al ejecutar la tarea ${task}`,
				})
			);
			console.error(error);
		}
	};
}
