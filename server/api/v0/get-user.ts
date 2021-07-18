import { Request, Response, NextFunction } from 'express';


/**
 * login
 */
export async function getUser(req: Request, res: Response, next: NextFunction) {
	try {
		return res.status(200).json({
      user: res.locals.user
		});
	} catch (err) {
		return next(err);
	}
}
