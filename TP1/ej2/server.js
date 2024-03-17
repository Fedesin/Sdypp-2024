const net = require('net');
const http = require('http');

const PORT = 3002;

const server = net.createServer((socket) => {
	socket.on('data', (data) => {
		console.log('Mensaje recibido del cliente:', data.toString());
		socket.write(
			JSON.stringify({
				message: 'Hola soy B. Mensaje recibido correctamente',
				receivedMessage: data.toString(),
			})
		);
	});
	// Manejo del evento de error en el socket del cliente
	socket.on('error', (err) => {
		console.error('Error en el socket del cliente:', err.message);
	});
});

server.listen(PORT, () => {
	console.log(`Servidor TCP escuchando en el puerto ${PORT}`);
});

server.on('connection', (req, res) => {
	console.log('Cliente conectado');
});

const statusServer = http.createServer((req, res) => {
	if (req.url === '/status') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(
			JSON.stringify({
				service: 'Servidor socket TCP',
				status: 'OK',
				message: 'Servidor funcionando correctamente',
			})
		);
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Ruta no encontrada');
	}
});

statusServer.listen(8082);
