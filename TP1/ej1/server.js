const net = require('net');
const http = require('http');

const server = net.createServer((socket) => {
	socket.on('data', (data) => {
		console.log('Mensaje recibido del cliente:', data.toString());
		socket.write(
			JSON.stringify({
				message: 'Mensaje recibido correctamente',
				receivedMessage: data.toString(),
			})
		);
	});
});

server.listen(3000, () => {
	console.log('Servidor escuchando en el puerto 3000');
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

statusServer.listen(8080);
