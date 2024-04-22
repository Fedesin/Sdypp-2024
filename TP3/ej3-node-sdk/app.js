const { InstancesClient } = require('@google-cloud/compute');
const fs = require('fs');
const readline = require('readline');

async function createClient(projectId, credentials) {
	try {
		return new InstancesClient({
			projectId,
			credentials,
		});
	} catch (error) {
		console.error('Error al crear el cliente GCP:', error);
	}
}

// Función para leer una línea desde la entrada estándar
function prompt(question) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer);
		});
	});
}

(async () => {
	if (process.argv.length !== 3) {
		console.log(
			'Comando invalido. Utilice node app.js <path-to-credentials.json>'
		);
		process.exit(1);
	}

	const credentialsPath = process.argv.slice(2)[0];

	if (!credentialsPath) {
		console.error('Debes proporcionar la ruta al archivo credentials.json');
		process.exit(1);
	}

	try {
		const credentials = JSON.parse(
			fs.readFileSync(credentialsPath, 'utf-8')
		);

		let projectId = await prompt(
			'Por favor ingresa el ID del proyecto de GCP: '
		);
		projectId = projectId.trim();

		if (!projectId) {
			console.error('Debes proporcionar un ID de projecto GCP');
			process.exit(1);
		}

		const client = await createClient(projectId, credentials);

		const zone = 'us-east1-b';

		const [instances] = await client.list({
			project: projectId,
			zone,
		});

		console.log(
			'\n====================== INSTANCIAS ===========================\n'
		);

		if (instances.length === 0) {
			console.log("No hay instancias de VM's existentes en el proyecto");
			process.exit(0);
		}

		console.log(
			' Número | ID                  | Nombre               | Estado'
		);
		instances.forEach(({ id, name, status }, index) => {
			console.log(
				` ${(index + 1).toString().padEnd(6)} | ${id.padEnd(
					18
				)} | ${name.padEnd(18)} | ${status}`
			);
		});
	} catch (error) {
		console.error(
			'Error al cargar las credenciales desde el archivo:',
			error
		);
		process.exit(1);
	}
})();
