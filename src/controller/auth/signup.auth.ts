import { Request, Response, NextFunction } from 'express';
import DataBase from '../../database';
import { v4 as uuid4 } from 'uuid';
import UtilsService from '../../services/util.service';
import { HttpException } from './../../utils/exception';
import { FlutterWave } from '../../utils/flutterwave';

export const registerNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { body: { fullName, age, contact, email, password, bvn, tax_ref } } = req;
    const db = new DataBase();
    const uS = new UtilsService();
    const flw = new FlutterWave();

    try {
        const userDetails = {
            fullName,
            age,
            contact,
            email,
            password, 
            bvn,
            tax_ref
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
            password: hashPassword,
            bvn: userDetails.bvn,
            tax_ref:userDetails.tax_ref
        });

        if (result) {
            const registeredUser = await db.connection('Users').where({
                id: userId
            }).select();

            if (!registeredUser) {
                return next(new HttpException(404, 'User with this credentials was not found'));
            }

            //create a flutterwave virtual wallet
            const createVirtualAccount  = await flw.createVirtualWallets({ email: registeredUser[0].email, is_permanent: true, bvn: registeredUser[0].bvn, tx_ref: registeredUser[0].tax_ref });
            //console.log(createVirtualAccount);
            // get the virtual wallet account number
            //const getVirtualAccountNumber = await flw.getVirtualAccountNumber(createVirtualAccount.data?.) 

            if (!createVirtualAccount) {
                return next(new HttpException(400, 'Could not create a flutter wallet'));
            }
            
            const walletId: string = uuid4();
            const createUserWallet = await db.connection('Wallet').insert({
                id: walletId,
                wallet_user: registeredUser[0].id,
                flutterwave_account_number: createVirtualAccount.data.account_number,
                flutterwave_back_name: createVirtualAccount.data.bank_name
            })

            if (!createUserWallet) {
                return Promise.reject({ message: "user account was not created, try again" });
            }


            return res.status(200).json({ status: result, message: 'successfully registered ' });
        }


    } catch (e: any) {
        res.status(400).json(e);
    }
}