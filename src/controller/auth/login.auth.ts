import { Request, Response, NextFunction } from 'express';
import DataBase from '../../database';
import UtilsService from '../../services/util.service';


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { body: { email, password } } = req;
    const db = new DataBase();
    const uS = new UtilsService();

    try {
        const isUser = await db.connection('Users').where({
            email
        }).select();
        
        if (isUser) {
            return console.log(isUser);
        }
    } catch (e) {
        res.status(400).json(e);
    }
}
