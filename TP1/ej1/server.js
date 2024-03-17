const net = require('net');

const server = net.createServer(socket => {
    console.log('Cliente conectado');

    socket.on('data', data => {
        const message = data.toString().trim();
        if (message === 'getStatus') {
            // Responder solo con el estado
            socket.write('Servidor está vivo');
        } else {
            console.log('Datos recibidos desde el cliente:', message);
        }
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor TCP escuchando en el puerto ${PORT}`);
});