const net = require('net');
const http = require('http');
const { register } = require('module');

const PORT = 3007;
const WINDOW_SIZE = 60000;

const nodes = []; // Nodos activos
const socketNodes = []; // Nodos + socket para informarles cuando están activos
const waitingNodes = []; // Nodos en espera


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
					message: 'Nodo registrado con éxito para la siguiente ventana',
				})
			);

			socket.on('error', (err) => {
				
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


// Registro de nodos en lista de espera
function registerNode(params, socket) 
{
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

statusServer.listen(8087);

// Cada 60 segundos se cambia la lista de nodos activos por la lista de nodos en espera
// La lista de nodos en espera se vacía
setInterval(() => {
				
	console.log('');
	console.log('Actualizando lista de nodos registrados: ');
	console.log('');
	
	nodes.length = 0;
	socketNodes.length = 0;
	
	console.log('Nodos: ');
	console.log('[');
	let i = 0;
	waitingNodes.map((node) => {
		nodes.push({port: node.port, host: node.host});
		socketNodes.push(node);
		i++;
		console.log('- Nodo ', i,': ', node.host,':',node.port, ',');
	});
	console.log(']');

	socketNodes.forEach(node => {
		node.socket.write(
			JSON.stringify({
				status: 'OK',
				message: 'Es tiempo de saludar!!',
				nodes: nodes,
			})
		);
	})

	console.log('');
	console.log('Lisa de nodos actualizada');
	console.log('');



	waitingNodes.length = 0;
}, WINDOW_SIZE);
