const express = require('express');
const app = express();

const HOST = 'localhost';

async function getStatus(url) {
	try {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		return {
			time: new Date().toISOString(),
			status: 'ERROR',
			message: 'El servicio no esta disponible',
		};
	}
}

app.get('/status/0', async (request, response) => {
	const status = {
		time: new Date().toISOString(),
		status: 'OK',
		service: 'Servidor de checkeo de estado',
		message: 'El servicio funcionando correctamente',
	};

	response.end(JSON.stringify(status));
});

app.get('/status/1', async (request, response) => {
	const status = await getStatus(`http://${HOST}:8081/status`);
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(JSON.stringify(status));
});

app.get('/status/2', async (request, response) => {
	const status = await getStatus(`http://${HOST}:8082/status`);
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(JSON.stringify(status));
});

app.get('/status/3', async (request, response) => {
	const status = await getStatus(`http://${HOST}:8083/status`);
	response.setHeader('Content-Type', 'application/json');
	response.status(200);

	response.end(JSON.stringify(status));
});

app.get('/status/4', async (request, response) => {
	const status1 = await getStatus(`http://${HOST}:8084/status`);
	const status2 = await getStatus(`http://${HOST}:8040/status`);
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
	const status1 = await getStatus(`http://${HOST}:8085/status`);
	const status2 = await getStatus(`http://${HOST}:8050/status`);
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
	const services = [];

	let status = await getStatus(`http://${HOST}:8086/status`);
	services.push(status);

	status = await getStatus(`http://${HOST}:8006/status`);
	services.push(status);

	status = await getStatus(`http://${HOST}:8016/status`);
	services.push(status);

	status = await getStatus(`http://${HOST}:8026/status`);
	services.push(status);

	response.setHeader('Content-Type', 'application/json');
	response.status(200);
	response.end(JSON.stringify(services));
});

app.get('/status/7', async (request, response) => {
	const services = [];

	let status = await getStatus(`http://${HOST}:8087/status`);
	services.push(status);

	status = await getStatus(`http://${HOST}:8007/status`);
	services.push(status);

	status = await getStatus(`http://${HOST}:8017/status`);
	services.push(status);

	status = await getStatus(`http://${HOST}:8027/status`);
	services.push(status);

	response.setHeader('Content-Type', 'application/json');
	response.status(200);
	response.end(JSON.stringify(services));
});

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
