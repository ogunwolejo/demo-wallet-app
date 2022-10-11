import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "config";
import { TokenPayload } from '../interface/utilservice.interfcae';


class UtilsService {
    public hashPassword(password: string) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    public compareBcrypt(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }

    public generateToken(payload: TokenPayload) {
        const secretKey: string = config.get('secretKey');
        const token = jwt.sign({ id: payload.userId, name: payload.userName, email: payload.userEmail, walletAccountNumber: payload.userVirtualFlwAccountNumber, walletBankName: payload.userVirtualFlwBankName }, `${secretKey}`, { algorithm: 'HS256', expiresIn: 2 * 3600 }); // expires in 2hours
        return token;
    }


    public decodeToken(token: string) {
        const secretKey: string = config.get('secretKey');
        return jwt.decode(token, { complete: true })
    }

    public verifyToken(token: string, time: number) {
        const secretKey: string = config.get('secretKey');
        return jwt.verify(token, secretKey, { maxAge: time });
    }
}

export default UtilsService;