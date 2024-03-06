import { Server } from './presentation/server';
import { router } from './presentation/routes';
import dotenv from 'dotenv';

dotenv.config();
const port = Number(process.env.PORT) || 3000;

const server = new Server({ port, routes: router });

server.start();
