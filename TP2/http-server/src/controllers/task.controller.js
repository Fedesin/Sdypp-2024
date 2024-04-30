import { DockerClient } from '../utils/docker-client.js';
import { logger } from '../plugin/logger.js';

export class TaskController {
	executeGenericTask = async (request, response) => {
		const docker = new DockerClient();

		const { body } = request;
		const { image, port, tag, task, params } = body;

		try {
			await docker.pull(image);
			await docker.run(image, tag, port);

			// Enviar petición HTTP para que la tarea se ejecute con los parámetros (task, params).
			const name = `task-${port}`;
			const res = await fetch(`http://${name}:${port}/task/${task}`, {
				method: 'POST',
				body: JSON.stringify({ params }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			const result = data.result;

			logger.log({
				level: 'info',
				status: '200 - OK',
				time: new Date().toISOString(),
				service: 'Servidor HTTP',
				message: `Tarea ${task} ejecutada con éxito. Parámetros: ${params}. Resultado: ${result}`,
			});

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

			logger.log({
				level: 'error',
				status: '400 - BAD REQUEST',
				time: new Date().toISOString(),
				service: 'Servidor HTTP',
				message: `Error al ejecutar la tarea ${task} en un contenedor de tipo ${image}.`,
			});
			console.error(error);
		}
	};
}
