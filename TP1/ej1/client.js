const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();
const PORT = 3000;
const HOST = '127.0.0.1';

function checkServerStatus() {
    client.write('getStatus');
}

client.connect(PORT, HOST, () => {
    console.log('Conectado al servidor');
    console.log('Escribe un mensaje para enviar al servidor (Presiona Ctrl+C para salir)');
    
    rl.on('line', input => {
        client.write(input);
    });
});

client.on('data', data => {
    console.log('Datos recibidos desde el servidor:', data.toString());
});

client.on('close', () => {
    console.log('Conexión cerrada');
});

// Verificar el estado del servidor antes de conectarse
checkServerStatus();