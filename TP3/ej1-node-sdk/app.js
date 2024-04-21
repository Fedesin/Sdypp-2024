const { InstancesClient } = require('@google-cloud/compute');
const fs = require('fs');
const readline = require('readline');

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

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

try {
	const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

	rl.question(
		'Por favor ingresa el ID del proyecto de GCP: ',
		(projectId) => {
			projectId = projectId.trim();

			if (!projectId) {
				console.error('Debes proporcionar un ID de projecto GCP');
				process.exit(1);
			}

			rl.question(
				'Por favor ingresa la cantidad de instancias que deseas crear: ',
				(numInstances) => {
					numInstances = parseInt(numInstances.trim());

					if (!numInstances || numInstances < 1) {
						console.error(
							'Debes proporcionar un número de instancias válido'
						);
						process.exit(1);
					}

					createInstances(projectId, credentials, numInstances);
					rl.close();
				}
			);
		}
	);
} catch (error) {
	console.error('Error al cargar las credenciales desde el archivo:', error);
	process.exit(1);
}

async function createInstances(projectId, credentials, numInstances) {
	try {
		const instancesClient = new InstancesClient({
			projectId,
			credentials,
		});

		const zone = 'us-east1-b';
		const baseName = 'vm-instance';

		for (let i = 0; i < numInstances; i++) {
			const instanceName = `${baseName}-${i}`;
			const instanceResource = {
				name: instanceName,
				machineType: `zones/${zone}/machineTypes/e2-medium`,
				disks: [
					{
						boot: true,
						initializeParams: {
							sourceImage:
								'projects/ubuntu-os-cloud/global/images/ubuntu-2004-focal-v20240307b',
						},
					},
				],
				networkInterfaces: [
					{
						network: 'global/networks/default',
						accessConfigs: [
							{
								name: 'External NAT',
								type: 'ONE_TO_ONE_NAT',
							},
						],
					},
				],
			};

			const [operation] = await instancesClient.insert({
				project: projectId,
				zone: zone,
				instanceResource: instanceResource,
			});

			console.log(`Instancia ${instanceName} en la zona ${zone} creada.`);
			console.log(`Operación en progreso: ${operation.name}`);
		}
	} catch (error) {
		console.error('Error al crear las instancias:', error);
	}
}
