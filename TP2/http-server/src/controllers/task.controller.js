export class TaskController {
	executeGenericTask = async (request, response) => {
		const { body } = request;
		const { image, task, params } = body;

		// TODO: Levantar contenedor con la imagen (image)

		// Enviar petición HTTP para que la tarea se ejecute con los parámetros (task, params).
		try {
			
			console.log("params: ", request.body)
			console.log("task: ", task)
			
			const res = await fetch(`http://localhost:5000/task/${task}`, {
				method: 'POST',
				body: JSON.stringify({ params }),
				headers: {
          'Content-Type': 'application/json'
        }
			});

			const data = await res.json();
			console.log(data)
			const result = data.result;
			response.status(200)
			response.end(
				JSON.stringify({
					message: `Tarea ${task} ejecutada exitosamente`,
					result,
				})
			);
		} catch (error) {
			response.status(400)
			response.end(
				JSON.stringify({
					message: `Error al ejecutar la tarea ${task}`
				})
			);
			console.log(error)
		}
	};
}
