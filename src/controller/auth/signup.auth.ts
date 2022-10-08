import { Request, Response, NextFunction } from 'express';
import DataBase from '../../database';
import { v4 as uuid4 } from 'uuid';
import UtilsService from '../../services/util.service';
import { HttpException } from './../../utils/exception';

export const registerNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { body: { fullName, age, contact, email, password } } = req;
    const db = new DataBase();
    const uS = new UtilsService();
    
    try {
        const userDetails = {
            fullName,
            age,
            contact,
            email,
            password
        }

        const hashPassword = uS.hashPassword(userDetails.password);
        const userId: string = uuid4();

        // inserting details into db
        const result = await db.connection('Users').insert({
            id: userId,
            fullName: userDetails.fullName,
            age: userDetails.age,
            contact: userDetails.contact,
            email: userDetails.email,
            password: hashPassword
        });

        if (result) {
            const registeredUser = await db.connection('Users').where({
                id: userId
            }).select('id');

            if (!registeredUser) {
                return next(new HttpException(404, 'User with this credentials was not found'));
            }

            //console.log('userId', registeredUser);

            //create the user's wallet
            const walletId: string = uuid4();
            const createUserWallet = await db.connection('Wallet').insert({
                id: walletId,
                wallet_user: registeredUser[0].id
            })

            if (!createUserWallet) {
                return Promise.reject({ message: "user account was not created, try again" });
            }


            return res.status(200).json({ status:result, message: 'successfully registered ' });
        }

       
    } catch (e:any) {
        res.status(400).json(e);
    }
}