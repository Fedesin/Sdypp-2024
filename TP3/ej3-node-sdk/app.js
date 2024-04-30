const { InstancesClient } = require('@google-cloud/compute');
const fs = require('fs');
const readline = require('readline');

let compute = null;

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

// Función para detener una instancia
async function stopInstance(projectId, zone, instanceId) {
	try {
		await compute.stop({
			project: projectId,
			zone: zone,
			instance: instanceId,
		});
		console.log(`Instancia ${instanceId} detenida correctamente.`);
	} catch (error) {
		console.error('Error al detener la instancia:', error);
	}
}

// Función para iniciar una instancia
async function startInstance(projectId, zone, instanceId) {
	try {
		await compute.start({
			project: projectId,
			zone: zone,
			instance: instanceId,
		});
		console.log(`Instancia ${instanceId} iniciada correctamente.`);
	} catch (error) {
		console.error('Error al iniciar la instancia:', error);
	}
}

// Función para eliminar una instancia
async function deleteInstance(projectId, zone, instanceId) {
	try {
		await compute.delete({
			project: projectId,
			zone: zone,
			instance: instanceId,
		});
		console.log(`Instancia ${instanceId} eliminada correctamente.`);
	} catch (error) {
		console.error('Error al eliminar la instancia:', error);
	}
}

// Función para listar las instancias de forma estética
async function listInstances(projectId, zone) {
	try {
		const [instances] = await compute.list({
			project: projectId,
			zone: zone,
		});

		console.log(
			'\n====================== INSTANCIAS ===========================\n'
		);

		if (instances.length === 0) {
			console.log("No hay instancias de VM's existentes en el proyecto");
			return;
		}

		console.log(
			' Número | ID                 | Nombre               | Estado'
		);
		instances.forEach(({ id, name, status }, index) => {
			console.log(
				` ${(index + 1).toString().padEnd(6)} | ${id.padEnd(
					18
				)} | ${name.padEnd(18)} | ${status}`
			);
		});
	} catch (error) {
		console.error('Error al listar las instancias:', error);
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

		compute = await createClient(projectId, credentials);

		const zone = 'us-east1-b';

		let option = -1;
		while (option !== 0) {
			console.log('\nMenú:');
			console.log('1. Listar instancias');
			console.log('2. Detener instancia');
			console.log('3. Iniciar instancia');
			console.log('4. Eliminar instancia');
			console.log('0. Salir \n');

			option = await prompt('Seleccione una opción: ');
			switch (option) {
				case '1':
					await listInstances(projectId, zone);
					break;
				case '2':
					const stopInstanceId = await prompt(
						'Ingrese el ID de la instancia a detener: '
					);
					await stopInstance(projectId, zone, stopInstanceId);
					break;
				case '3':
					const startInstanceId = await prompt(
						'Ingrese el ID de la instancia a iniciar: '
					);
					await startInstance(projectId, zone, startInstanceId);
					break;
				case '4':
					const deleteInstanceId = await prompt(
						'Ingrese el ID de la instancia a eliminar: '
					);
					await deleteInstance(projectId, zone, deleteInstanceId);
					break;
				case '0':
					process.exit(0);
				default:
					console.log('Opción no válida.');
			}
		}
	} catch (error) {
		console.error(
			'Error al cargar las credenciales desde el archivo:',
			error
		);
		process.exit(1);
	}
})();
