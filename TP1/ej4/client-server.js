const net = require('net');

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
if (args.length !== 4) {
    console.log("Uso: node program.js <ip_servidor> <puerto_servidor> <ip_cliente> <puerto_cliente>");
    process.exit(1);
}

const serverAddress = { host: args[0], port: parseInt(args[1]) };
const clientAddress = { host: args[2], port: parseInt(args[3]) };

// Crear servidor
const server = net.createServer((socket) => {
    console.log('Cliente conectado desde', socket.remoteAddress + ':' + socket.remotePort);

    socket.on('data', (data) => {
        console.log('Mensaje recibido del cliente:', data.toString());
        // Respondemos al cliente
        socket.write(`Saludos desde el servidor a ${socket.remoteAddress}:${socket.remotePort}`);
    });

    socket.on('error', (err) => {
        console.error('Error en el socket del cliente:', err.message);
    });
});

server.listen(serverAddress.port, serverAddress.host, () => {
    console.log(`Servidor TCP escuchando en ${serverAddress.host}:${serverAddress.port}`);
});

// Crear cliente y conectarse al otro nodo
const client = new net.Socket();

client.connect(clientAddress.port, clientAddress.host, () => {
    console.log(`Conectado al servidor en ${clientAddress.host}:${clientAddress.port}`);
    // Enviar saludo al servidor
    client.write(`Saludos desde el cliente a ${serverAddress.host}:${serverAddress.port}`);
});

client.on('data', (data) => {
    console.log('Mensaje recibido del servidor:', data.toString());
});

client.on('error', (err) => {
    console.error('Error en el socket del servidor:', err.message);
});