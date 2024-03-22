const net = require('net');
const http = require('http');
const { logger } = require('./plugin/logger');

const PORT = 3001;

const server = net.createServer((socket) => {
	socket.on('data', (data) => {
		console.log('Mensaje recibido del cliente:', data.toString());
		socket.write(
			JSON.stringify({
				message: 'Mensaje recibido correctamente',
				receivedMessage: data.toString(),
			})
		);
		logger.log({
			level: 'info',
			time: new Date().toISOString(),
			service: 'Servidor TCP',
			message: `Mensaje recibido del cliente: ${data.toString()}`,
		});
	});
	// Manejo del evento de error en el socket del cliente
	socket.on('error', (err) => {
		console.error('Error en el socket del cliente:', err.message);
		logger.log({
			level: 'error',
			time: new Date().toISOString(),
			service: 'Servidor TCP',
			message: `Error en el socket del cliente: ${err.message}`,
		});
	});
});

server.listen(PORT, () => {
	console.log(`Servidor TCP escuchando en el puerto ${PORT}`);
});

server.on('connection', (req, res) => {
	console.log('Cliente conectado');
	logger.log({
		level: 'info',
		time: new Date().toISOString(),
		service: 'Servidor TCP',
		message: `Cliente conectado al servidor TCP`,
	});
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

statusServer.listen(8081);
