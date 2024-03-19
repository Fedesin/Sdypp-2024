const dgram = require('dgram');
const readline = require('readline');

const HOST = process.argv[2] || '127.0.0.1';
const PORT = 3002;

const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on('message', (response, remoteInfo) => {
  console.log(`Respuesta del servidor: ${remoteInfo.address}:${remoteInfo.port}:`, response.toString());
  rl.setPrompt('Introduce un mensaje (o "exit" para cerrar la conexión): ');
  rl.prompt();
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    client.close();
    rl.close();
  } else {
    client.send(input, 0, input.length, PORT, HOST, (error) => {
      if (error) {
        console.error('Error al enviar mensaje:', error.message);
        client.close();
        rl.close();
      }
    });
  }
});

rl.on('close', () => {
  console.log('Conexión cerrada.');
  client.close();
});

console.log('Introduce un mensaje (o "exit" para cerrar la conexión):');
rl.prompt();
