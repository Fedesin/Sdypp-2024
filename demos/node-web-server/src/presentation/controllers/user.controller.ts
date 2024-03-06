import { Request, Response } from 'express';
import { User } from '../../domain/entities/user';

export class UserController {
	public async getUser(request: Request, response: Response) {
		const user = new User({
			name: 'Usuario 1',
			email: 'asdasd@asdasd.com',
			age: 23,
		});

		response.status(200);
		response.json(user);
	}
}
