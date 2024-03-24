const net = require('net');
const http = require('http');

const PORT = 3007;
const WINDOW_SIZE = 60000; // 60 segundos

let nodes = []; // Nodos activos
let socketNodes = []; // Nodos + socket para informarles cuando están activos
let waitingNodes = []; // Nodos en espera

// Al principio, cada nodo se registra en la lista de espera para la siguiente ventana
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

			registerNode(params, socket);

			socket.write(
				JSON.stringify({
					status: 'OK',
					time: new Date().toISOString(),
					message:
						'Nodo registrado con éxito para la siguiente ventana',
				})
			);

			socket.on('error', (err) => {});

			socket.on('close', () => {
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

// Registro de nodos en lista de espera
function registerNode(params, socket) {
	waitingNodes.map((node) => {
		if (node.port === params.port && node.host === params.host) {
			throw new Error('Nodo ya registrado');
		}
	});
	waitingNodes.push({ host: params.host, port: params.port, socket: socket });
}

server.listen(PORT, () => {
	console.log(`Servidor TCP escuchando en el puerto ${PORT}`);
});

server.on('connection', () => {
	console.log('Nodo registrado para la siguiente ventana');
});

// Cada 60 segundos se cambia la lista de nodos activos por la lista de nodos en espera
// La lista de nodos en espera se vacía
setInterval(() => {
	console.log('');
	console.log('Actualizando lista de nodos registrados: ');
	console.log('');

	nodes = [];
	socketNodes = [];

	if (waitingNodes.length > 0) {
		console.log('Nodos: ');
		console.log('[');
		waitingNodes.map((node, index) => {
			nodes.push({ port: node.port, host: node.host });
			socketNodes.push(node);
			console.log(`- Nodo ${index + 1}: ${node.host}:${node.port},`);
		});
		console.log(']');

		socketNodes.forEach(({ host, port, socket }) => {
			socket.write(
				JSON.stringify({
					status: 'OK',
					message: 'Es momento de enviar saludo!',
					// Envía todos los nodos menos el mismo a quien se lo envía
					nodes: nodes.filter(
						(currentNode) =>
							currentNode.port !== port ||
							currentNode.host !== host
					),
				})
			);
		});

		console.log('');
		console.log('Lista de nodos actualizada');
		console.log('');
	}

	waitingNodes = [];
}, WINDOW_SIZE);

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

statusServer.listen(8087);
