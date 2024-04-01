const URL = 'http://35.227.40.69:3000/api/execute';

async function callTask(url) {
	try {
		const params = {
			image: 'fedesin31/tp2-task-suma',
			port: 5000,
			task: 'sum',
			tag: 'latest',
			params: [1, 2, 3, 4],
		};

		console.log('Ejecutando tarea remota...');

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.log('E');
		console.error(error);
		return {
			time: new Date().toISOString(),
			status: 'ERROR',
			message: 'Error al ejecutar la tarea',
		};
	}
}

callTask(URL).then((result) => {
	console.log(result);
});