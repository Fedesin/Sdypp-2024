const net = require('net');

const client = new net.Socket();


// Función para verificar el estado del servidor
function checkServerStatus() {
    const options = {
        port: 3000,
        host: 'localhost'
    };

    const req = net.connect(options, () => {
        console.log('El servidor está encendido');
        req.end();
    });

    req.on('error', (err) => {
        console.log('El servidor está apagado');
    });
}

// Verificar el estado del servidor antes de hacer alguna operación
checkServerStatus();

// Lógica para enviar un mensaje al servidor
client.connect(3000, 'localhost', () => {
    console.log('Conectado al servidor');
    waitForUserInput();
});

// Función para esperar la entrada del usuario y enviarla al servidor
function waitForUserInput() {
    process.stdout.write('Ingrese un mensaje para enviar al servidor: ');

    process.stdin.on('data', (data) => {
        const message = data.toString().trim();
        client.write(message);

        process.stdout.write('Ingrese otro mensaje para enviar al servidor o presione CTRL+C para salir: ');
    });
}

client.on('close', () => {
    console.log('Conexión cerrada');
});