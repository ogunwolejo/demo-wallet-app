import { Router } from 'express';
import { registerNewUser as registerNewUserController } from '../controller/auth/signup.auth';
import { loginUser as loginUserController } from '../controller/auth/login.auth';
import {
  getAllBanks as getAllBanksController,
  withDrawalFundsToABank as withDrawalFundsToABankController,
    fundMyWallet as fundMyWalletController,
    walletToWalletTransfer as walletToWalletTransferController
} from '../controller/wallet/wallet.transactions';

class Route {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', registerNewUserController);
    this.router.post('/login', loginUserController);
    this.router.post('/withdraw-funds', withDrawalFundsToABankController);
      this.router.post('/fund-wallet', fundMyWalletController);
      this.router.post('/wallet-transfer', walletToWalletTransferController)
    this.router.get('/getBanks', getAllBanksController);
  }
}

export default Route;
