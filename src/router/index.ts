import { Router } from 'express';
import { registerNewUser as registerNewUserController } from '../controller/auth/signup.auth';
import { loginUser as loginUserController } from '../controller/auth/login.auth';
import {
  getAllBanks as getAllBanksController,
  withDrawalFundsToABank as withDrawalFundsToABankController,
    fundMyWallet as fundMyWalletController,
    walletToWalletTransfer as walletToWalletTransferController
} from '../controller/wallet/wallet.transactions';
import AuthMiddleware from '../middleware/auth.middleware';

class Route {
  public router = Router();
  private authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', registerNewUserController);
    this.router.post('/login', loginUserController);
    this.router.post('/withdraw-funds', this.authMiddleware.authMiddleware, withDrawalFundsToABankController);
    this.router.post('/fund-wallet', this.authMiddleware.authMiddleware, fundMyWalletController);
    this.router.post('/wallet-transfer', this.authMiddleware.authMiddleware, walletToWalletTransferController)
    this.router.get('/getBanks', getAllBanksController);
  }
}

export default Route;
