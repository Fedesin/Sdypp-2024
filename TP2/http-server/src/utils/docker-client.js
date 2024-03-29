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
					ExposedPorts: {
						'80/tcp': {},
					},
					HostConfig: {
						PortBindings: {
							'80/tcp': [
								{
									HostPort: `${port}`,
								},
							],
						},
					},
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

						setTimeout(() => {
							console.log('Container started successfully');
							resolve(true);
						}, 10000);

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
								console.log('Container stopped successfully');
							});
						}, 60000);
					});
				}
			);
		});
	}
}
