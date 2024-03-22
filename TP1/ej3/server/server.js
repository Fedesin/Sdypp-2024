const net = require('net');
const http = require('http');
const { logger } = require('./plugin/logger');

const port = 3003;

const server = net.createServer((socket) => {
	console.log('Cliente conectado.');

	socket.on('data', (data) => {
		console.log('Mensaje recibido de A:', data.toString());
		socket.write('Hola, soy B.');
		logger.log({
			level: 'info',
			time: new Date().toISOString(),
			service: 'Servidor TCP',
			message: `Mensaje recibido de cliente A: ${data.toString()}`,
		});
	});

	socket.on('close', () => {
		console.log('Un cliente A ha cerrado la conexión.');
		console.log('Esperando conexiones...');
		logger.log({
			level: 'info',
			time: new Date().toISOString(),
			service: 'Servidor TCP',
			message: `Un cliente A ha cerrado la conexión`,
		});
	});

	socket.on('error', (error) => {
		console.error('Error en la conexión:', error.message);
		logger.log({
			level: 'error',
			time: new Date().toISOString(),
			service: 'Servidor TCP',
			message: `Error en el socket del cliente: ${err.message}`,
		});
	});
});

server.listen(port, () => {
	console.log(`Servidor TCP B escuchando en el puerto ${port}`);
});

const statusServer = http.createServer((req, res) => {
	if (req.url === '/status') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(
			JSON.stringify({
				time: new Date().toISOString(),
				service: 'Servidor socket TCP',
				status: 'OK',
				message: 'Servidor funcionando correctamente',
			})
		);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		JSON.stringify({
			status: 'WARNING',
			message: 'Ruta no encontrada',
		});
	}
});

statusServer.listen(8083);
