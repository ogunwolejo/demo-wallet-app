import { Request, Response, NextFunction } from 'express';
import DataBase from '../../database';
import UtilsService from '../../services/util.service';
import { HttpException } from '../../utils/exception';
import { IUser } from './../../interface/user.interface';
import { TokenPayload } from '../../interface/utilservice.interfcae';


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { body: { email, password } } = req;
    const db = new DataBase();
    const uS = new UtilsService();

    try {
        const isUser = await db.connection('Users').where({
            email
        }).select('id', 'fullName', 'email', 'password');

        if (isUser) {
            console.log(isUser);
            const foundUser: IUser = isUser[0];
            // confirm password
            const isPasswordCorrect: boolean = uS.compareBcrypt(password, foundUser.password);

            if (!isPasswordCorrect) {
                return next(new HttpException(404, 'Incorrect password'));
            }

            const payload: TokenPayload = {
                userEmail: foundUser.email,
                userId: foundUser.id,
                userName: foundUser.fullName
            }

            const token = uS.generateToken(payload);
            return res.status(200).json({
                token,
                userId: payload.userId
            });
        }

        next(new HttpException(404, 'User with these credentials does not exist'));
    } catch (e) {
        res.status(400).json(e);
    }
}

/**
 * {
    id: '5b5bf179-6543-4f13-8dc8-6c5f98586645',
    fullName: 'Ogunwole Joshua ',
    age: 44,
    contact: '09031846448',
    email: 'ogunwolejo@gmail.com',
    password: '$2b$10$/E7M82tmKkhFMk4ImoTXROCgvfiKLZ32ndYqjktIiYPKu09XV2jNq',
    created_at: 2022-10-08T11:26:59.411Z
  }
 */
