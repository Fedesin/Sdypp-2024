import { Router } from 'express';
import { UserController } from './controllers/user.controller';

export const router = Router();
const userController = new UserController();

router.get('/api/user', userController.getUser);
