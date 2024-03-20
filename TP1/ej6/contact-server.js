const net = require('net');
const http = require('http');

const PORT = 3006;

let nodes = [];

const server = net.createServer((socket) => {
	socket.on('data', (data) => {
		console.log('Mensaje recibido del cliente:', data.toString());
		try {
			const params = JSON.parse(data.toString());

			if (
				!params.hasOwnProperty('port') ||
				!params.hasOwnProperty('host')
			) {
				throw new Error('Parámetros de registro inválidos');
			}

			if (Number.isNaN(params.port)) {
				throw new Error('El puerto debe ser un número');
			}

			if (params.host.length === 0) {
				throw new Error('El host no puede estar vacío');
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
				console.log(err);
			});

			socket.on('close', () => {
				nodes.forEach((node) => {
					try {
						const client = new net.Socket();
						client.connect(port, host, () => {
							client.write('ping');
						});
					} catch (error) {
						console.log(node, nodes);
						nodes.splice(nodes.indexOf(node), 1);
					}
				});
				console.log('Cliente desconectado.');
			});
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
				time: new Date().toISOString(),
				service: 'Servidor de registro',
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

statusServer.listen(8086);
