const express = require('express');
const app = express();

async function getStatus(url) {
	try {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		return {
			status: 'ERROR',
			message: 'El servicio no está disponible',
		};
	}
}

app.get('/status/1', async (request, response) => {
	const status = await getStatus('http://localhost:8081/status');
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(JSON.stringify(status));
});

app.get('/status/2', async (request, response) => {
	const status = await getStatus('http://localhost:8082/status');
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(JSON.stringify(status));
});

app.get('/status/3', async (request, response) => {
	const status = await getStatus('http://localhost:8083/status');
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(JSON.stringify(status));
});

app.get('/status/4', async (request, response) => {
	const status1 = await getStatus('http://localhost:8084/status');
	const status2 = await getStatus('http://localhost:8004/status');
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(
		JSON.stringify({
			'Nodo 1': status1,
			'Nodo 2': status2,
		})
	);
});

app.get('/status/5', async (request, response) => {
	const status1 = await getStatus('http://localhost:8085/status');
	const status2 = await getStatus('http://localhost:8005/status');
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(
		JSON.stringify({
			'Nodo 1': status1,
			'Nodo 2': status2,
		})
	);
});

app.get('/status/6', async (request, response) => {
	const status = await getStatus('http://localhost:8086/status');
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(JSON.stringify(status));
});

app.get('/status/7', async (request, response) => {
	const status = await getStatus('http://localhost:8087/status');
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(JSON.stringify(status));
});

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
