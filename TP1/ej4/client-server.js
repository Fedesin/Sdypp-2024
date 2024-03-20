const net = require('net');
const http = require('http');

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
if (args.length !== 5) {
	console.log(
		'Uso: node program.js <ip_servidor> <puerto_servidor> <ip_cliente> <puerto_cliente> <puerto_status_endpoint>'
	);
	process.exit(1);
}

const serverAddress = { host: args[0], port: parseInt(args[1]) };
const remoteAddress = { host: args[2], port: parseInt(args[3]) };
const httpPort = args[4];

// Crear servidor
const server = net.createServer((socket) => {
	console.log(
		'Cliente conectado desde',
		socket.remoteAddress + ':' + socket.remotePort
	);

	socket.on('data', (data) => {
		console.log('Mensaje recibido del cliente:', data.toString());
		// Respondemos al cliente
		socket.write(
			`Saludos desde el servidor ${serverAddress.host}:${serverAddress.port}`
		);
	});

	socket.on('error', (err) => {
		console.error('Error en el cliente:', err.message);
	});
});

server.listen(serverAddress.port, serverAddress.host, () => {
	console.log(
		`Servidor TCP escuchando en ${serverAddress.host}:${serverAddress.port}`
	);
});

// Crear cliente y conectarse al otro nodo
function connectToServer() {
	const client = new net.Socket();

	client.connect(remoteAddress, () => {
		console.log('Conexión establecida con servidor remoto.');
		client.write(
			`Hola, soy un cliente tipo C. Conectado desde ${remoteAddress.host}:${remoteAddress.port}`
		);
	});

	client.on('data', (data) => {
		console.log('Mensaje recibido desde el servidor:', data.toString());
	});

	client.on('close', () => {
		console.log(
			'Error en la conexión con el servidor. Intentando reconectar...'
		);
		setTimeout(connectToServer, 10000); // Intentar reconexión después de 10 segundos
	});

	client.on('error', (error) => {
		console.error('Error en la conexión:', error.message);
		client.destroy();
	});
}

setTimeout(connectToServer, 10000);

const statusServer = http.createServer((req, res) => {
	if (req.url === '/status') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(
			JSON.stringify({
				time: new Date().toISOString(),
				service: 'Cliente/Servidor TCP',
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

statusServer.listen(httpPort);
