const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 3002;

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor UDP escuchando en ${address.address}:${address.port}`);
});

server.on('message', (message, remoteInfo) => {
  console.log(`Mensaje recibido de ${remoteInfo.address}:${remoteInfo.port}:`, message.toString());

  const response = `Mensaje recibido: ${message.toString()}`;
  server.send(response, 0, response.length, remoteInfo.port, remoteInfo.address, (error) => {
    if (error) {
      console.error('Error al enviar respuesta:', error.message);
    }
  });
});

server.on('close', () => {
  console.log('Servidor UDP cerrado.');
});

server.bind(PORT);
