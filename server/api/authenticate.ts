import { Request, Response, NextFunction } from 'express';
import securityService from '../services/security.service';
import ILogin from '../types/login';

/**
 * login
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: Response, next: NextFunction) => {
	const login: ILogin = req.body;
	try {
		const token: any = await securityService.getJwt(login);
		return res.status(200).json({
      jwt: token
		});
	} catch (err) {
		return next(err);
	}
}
