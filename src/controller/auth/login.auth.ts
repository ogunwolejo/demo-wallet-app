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
            const foundUser: IUser = isUser[0];
            // confirm password
            const isPasswordCorrect: boolean = uS.compareBcrypt(password, foundUser.password);

            if (!isPasswordCorrect) {
                return next(new HttpException(404, 'Incorrect password'));
            }

            const userWalletDetails = await db.connection('Wallets').where({
                wallet_user: isUser[0].id
            });

            if (!userWalletDetails) {
                return next(new HttpException(400, 'User does not have a virtual wallet, please create one '));
            }

            const payload: TokenPayload = {
                userEmail: foundUser.email,
                userId: foundUser.id,
                userName: foundUser.fullName,
                userVirtualFlwAccountNumber: userWalletDetails[0].flutterwave_account_number,
                userVirtualFlwBankName: userWalletDetails[0].flutterwave_back_name
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

