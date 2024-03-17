const net = require('net');

const options = {
	port: 3000,
	host: '0.0.0.0',
};

const client = net.createConnection(options, () => {
	console.log('Conectado al servidor');
	waitForUserInput();
});

client.on('close', () => {
	console.log('Conexión cerrada');
});

client.on('data', (data) => {
	console.log(`\n Respuesta del servidor: ${data.toString()} \n`);
	process.stdout.write('Ingrese otro mensaje para enviar al servidor: ');
});

// Función para esperar la entrada del usuario y enviarla al servidor
function waitForUserInput() {
	process.stdout.write('Ingrese un mensaje para enviar al servidor: ');

	process.stdin.on('data', (data) => {
		const message = data.toString().trim();
		client.write(message);
	});
}
