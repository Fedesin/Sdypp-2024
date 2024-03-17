const net = require('net');
const http = require('http');

const port = 3003;

const server = net.createServer((socket) => {
	console.log('Cliente conectado.');

	socket.on('data', (data) => {
		console.log('Mensaje recibido de A:', data.toString());
		socket.write('Hola, soy B.');
	});

	socket.on('close', () => {
		console.log('Un cliente A ha cerrado la conexión.');
		console.log('Esperando conexiones...');
	});

	socket.on('error', (error) => {
		console.error('Error en la conexión:', error.message);
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

statusServer.listen(8083);
