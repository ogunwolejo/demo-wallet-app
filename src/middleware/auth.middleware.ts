import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from 'config';
import { HttpException } from '../utils/exception';

class AuthMiddleware {
    public authMiddleware = (req: Request, res: Response, next: NextFunction) => {
        try {
            const authToken: string | null =
                req.headers['authorization']?.split('Bearer ')[1] || null;
            if (authToken) {
                const secretKey = config.get('secretKey');
                // @ts-ignore
                const tokenResponse = jwt.verify(authToken, secretKey, {
                    algorithm: 'HS256',
                    maxAge: 2 * 3600
                });

                // verifying token
                if (tokenResponse) {
                    //console.log(tokenResponse);
                    return next();
                }

                return next(new HttpException(498, 'Invalid Token'));
            } else {
                return next(new HttpException(404, 'Authentication token missing'));
            }
        } catch (e) {
            next(new HttpException(401, 'Unauthorized'));
        }
    };
}

export default AuthMiddleware;
