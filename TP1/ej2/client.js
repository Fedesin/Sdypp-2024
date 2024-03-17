const net = require('net');

const host = '127.0.0.1';
const port = 3002;

function connectToServer() {
	const client = new net.Socket();

	client.connect(port, host, () => {
		console.log('Conexión establecida con B.');
		client.write('Hola, soy A.');
	});

	client.on('data', (data) => {
		console.log('Mensaje recibido de B:', data.toString());
	});

	client.on('close', () => {
		console.log(
			'\nLa conexión con B se ha cerrado inesperadamente. Intentando reconectar...\n'
		);
		setTimeout(connectToServer, 10000); // Intentar reconexión después de 10 segundos
	});

	client.on('error', (error) => {
		console.error('Error en la conexión:', error.message);
		client.destroy();
	});
}

connectToServer();
