import Dockerode from 'dockerode';

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
								});
							});
						}, 90000);
					});
				}
			);
		});
	}

	// async getIPByName(containerName) {
	// 	return new Promise((resolve, reject) => {
	// 		this.docker.listContainers({ all: true }, (err, containers) => {
	// 			if (err) {
	// 				console.error('Error listing containers:', err);
	// 				reject(err);
	// 				return;
	// 			}

	// 			const container = containers.find((container) =>
	// 				container.Names.includes('/' + containerName)
	// 			);
	// 			if (!container) {
	// 				reject(
	// 					new Error(
	// 						`Container with name ${containerName} not found`
	// 					)
	// 				);
	// 				return;
	// 			}

	// 			const containerObj = this.docker.getContainer(container.Id);
	// 			containerObj.inspect((err, data) => {
	// 				if (err) {
	// 					console.error('Error inspecting container:', err);
	// 					reject(err);
	// 					return;
	// 				}
	// 				resolve(data.NetworkSettings.IPAddress);
	// 			});
	// 		});
	// 	});
	// }
}
