import Dockerode from 'dockerode';
import { logger } from '../plugin/logger.js';

export class DockerClient {
	constructor() {
		this.docker = new Dockerode({
			socketPath: '/var/run/docker.sock',
		});
	}

	async pull(image) {
		return new Promise((resolve, reject) => {
			this.docker.pull(image, (err, stream) => {
				if (err) {
					console.error('Error pulling image:', err);
					reject(false);
					return;
				}

				this.docker.modem.followProgress(
					stream,
					() => {
						console.log('Image pulled successfully');
						logger.log({
							level: 'info',
							time: new Date().toISOString(),
							service: 'Servidor HTTP',
							message: `Imagen  ${image} descargada con éxito.`,
						});
						resolve(true);
					},
					(progress) => {
						console.log('Pulling progress:', progress);
					}
				);
			});
		});
	}

	async run(image, tag, port) {
		return new Promise((resolve, reject) => {
			console.log('Creating container ...');
			this.docker.createContainer(
				{
					Image: `${image}:${tag}`,
					name: `tarea-${port}`,
					ExposedPorts: {
						[`${port}/tcp`]: {},
					},
					HostConfig: {
						PortBindings: {
							[`${port}/tcp`]: [
								{
									HostPort: `${port}`,
								},
							],
						},
					},
					NetworkingConfig: {
						EndpointsConfig: {
							'generic-task-network': {}, // Conecta el contenedor a la red especificada
						},
					},
					name: `task-${port}`,
				},
				(err, container) => {
					if (err) {
						console.error('Error creating container:', err);
						reject(false);
						return;
					}

					container.start((err) => {
						if (err) {
							console.error('Error starting container:', err);
							reject(false);
							return;
						}

						// Demora en resolver la promesa para asegurarse que el contenedor se esté ejecutando.
						setTimeout(() => {
							console.log('Container started successfully');
							logger.log({
								level: 'info',
								time: new Date().toISOString(),
								service: 'Servidor HTTP',
								message: `Contenedor creado con éxito con la imagen ${image}.`,
							});
							resolve(true);
						}, 20000);

						// Tras 90 segundos, detiene el contenedor.
						setTimeout(() => {
							console.log('Stopping container ...');
							container.stop((err) => {
								if (err) {
									console.error(
										'Error stopping container:',
										err
									);
									reject(false);
									return;
								}

								container.remove((err) => {
									if (err) {
										console.error(
											'Error removing container:',
											err
										);
										reject(false);
										return;
									}
									console.log(
										'Container stopped successfully'
									);
									logger.log({
										level: 'info',
										time: new Date().toISOString(),
										service: 'Servidor HTTP',
										message: `El contenedor fue detenido y removido con éxito.`,
									});
								});
							});
						}, 90000);
					});
				}
			);
		});
	}
}
