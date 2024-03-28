const URL = 'http://localhots:3000/api/execute'

async function callTask(url) {
	try {
    const params = {
      image: 'sum-task',
      task: 'sum',
      params: [1,2,3,4]
    };

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
    });

		const result = await response.json();
		
    return result;
    
	} catch (error) {
		console.error('Error:', error);
		return {
			time: new Date().toISOString(),
			status: 'ERROR',
			message: 'Error al ejecutar la tarea',
		};
	}
}

console.log(callTask(URL))