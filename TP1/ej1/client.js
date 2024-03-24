const net = require('net');

const options = {
	port: 3001,
	host: process.argv[2] || 'localhost',
};

const client = net.createConnection(options, () => {
	console.log('Conectado al servidor TCP');
	client.write('Hola, soy Al pacino xd.');
});

client.on('close', () => {
	console.log('Conexión cerrada con el servidor TCP');
});

client.on('error', (error) => {
	console.error('Error en la conexión:', error.message);
	client.destroy();
});

client.on('data', (data) => {
	console.log('Mensaje recibido de B:', data.toString());
});
