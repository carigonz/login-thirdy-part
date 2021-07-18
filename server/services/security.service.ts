import config from '../config/config';
import Users from '../resources/users.json';
import {
	NotFoundError,
	UnauthorizedError,
} from '../middleware/error/error-handler';
import ILogin from '../types/login';
import jwt from 'jsonwebtoken';
import User from '../types/user'

export default class securityService {

	public static async getJwt(login: ILogin) {
    
    const user: User = Users.data.find( (user) => user.email === login.email);

		if (!user) {
			throw new NotFoundError('No User found with email: ' + login.email);
		}
		// check password
		const match: boolean = await this.comparePassword(login.password, user.password);

		if (!match) {
			throw new UnauthorizedError('Invalid credentials');
		}

		// generate json web token
		const payload = {
			user_id: user.id,
			user_email: user.email,
			exp: Math.floor(Date.now() / 1000) + 29 * 24 * 60 * 60, // current timestam in seconds + expiration time in seconds (one month aprox)
		};

		return jwt.sign(payload, config.JWT_KEY);
	}

	private static async comparePassword(pass: string, jsonPass: string) {
		// THIS IS WRONG IN SO MANY WAYS WE NEED TO HASH JSON PASS
		// But for testing purposes...
		return pass === jsonPass;
	}
}