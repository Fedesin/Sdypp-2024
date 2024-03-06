import express, { Router } from 'express';

interface ServerOptions {
	port: number;
	routes: Router;
}

export class Server {
	private app = express();
	private readonly port: number = 3000;
	public readonly routes: Router;

	constructor({ port, routes }: ServerOptions) {
		this.port = port;
		this.routes = routes;
	}

	public start(): void {
		//* Configura rutas de la API
		this.app.use(this.routes);

		//* Levanta el servidor
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}
