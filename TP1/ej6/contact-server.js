const net = require('net');
const http = require('http');

const PORT = 3006;

const nodes = [];

const server = net.createServer((socket) => {
	socket.on('data', (data) => {
		console.log('Mensaje recibido del cliente:', data.toString());
		try {
			const params = JSON.parse(data.toString());
			console.log(params);
			if (
				!params.hasOwnProperty('port') ||
				!params.hasOwnProperty('host')
			) {
				throw new Error('Parámetros de registro inválidos');
			}

			socket.write(
				JSON.stringify({
					status: 'OK',
					message: 'Nodo registrado con éxito',
					nodes: nodes,
				})
			);

			nodes.forEach((node) => {
				if (node.port === params.port && node.host === params.host) {
					throw new Error('Nodo ya registrado');
				}
			});

			nodes.push({ host: params.host, port: params.port });

			socket.on('error', (err) => {
				console.log(err)
			})
		} catch (error) {
			socket.write(
				JSON.stringify({
					status: 'ERROR',
					message: error.message,
				})
			);
		}
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
				service: 'Servidor de registro',
				status: 'OK',
				message: 'Servidor funcionando correctamente',
			})
		);
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Ruta no encontrada');
	}
});

statusServer.listen(8086);
