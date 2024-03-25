export class TaskController {
	executeGenericTask = (request, response) => {
		response.send('Task executed');
		// TODO: Debe levantar el contendor docker de la tarea genérica, enviar una petición HTTP para que la tarea se ejecute y envíar el resultado en la response.
	};
}
