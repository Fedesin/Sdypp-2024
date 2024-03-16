const net = require('net');

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log('Cliente conectado');
        console.log('Mensaje recibido del cliente:', data.toString());
        socket.write(data);
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

// Endpoint getStatus
server.on('request', (req, res) => {
    if (req.url === '/getStatus') {
        res.writeHead(200);
        res.end();
    } else {
        res.writeHead(404);
        res.end('Endpoint no encontrado');
    }
});