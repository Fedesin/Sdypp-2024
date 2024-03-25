import express from 'express';
import 'dotenv/config';
import { router } from './routes.js';

const server = express();

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

server.use(express.json());
server.use(router);

server.listen(port, host, () => {
	console.log(`Task service listening on ${host}:${port}`);
});
