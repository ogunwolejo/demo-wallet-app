import config from 'config';
import {
  createVirtualAccountPayload,
  fundAccountPayload,
  getVirtualAccountNumberPayload,
  walletToWalletTransferPayload,
  withDrawalPayload,
} from '../interface/flutterwave.interface';

let flutterwave = require('flutterwave-node-v3');

export class FlutterWave {
  public flw: any;
  private publicKey = config.get('flutterwaveKeys.publicApiKey');
  private secretKey = config.get('flutterwaveKeys.secretApiKey');
  constructor() {
    //console.log(this.publicKey, this.secretKey);
    this.flw = new flutterwave(this.publicKey, this.secretKey);
    //console.log(this.flw);
  }

  public async createVirtualWallets(payload: createVirtualAccountPayload) {
    try {
      const response = await this.flw.VirtualAcct.create(payload);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  }

  public async getVirtualAccountNumber(
    payload: getVirtualAccountNumberPayload
  ) {
    try {
      const response = await this.flw.VirtualAcct.fetch(payload);
      return {
        status: 'successful',
        response,
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  }

  public fundAccount = async (payload: fundAccountPayload) => {
    try {
      const response = await this.flw.Transfer.initiate(payload);
      return {
        response,
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  };

  public getAllBanks = async () => {
    try {
      const payload: { country: string } = {
        country: 'NG',
      };
      const response = await this.flw.Bank.country(payload);
      return {
        status: 'successful',
        response,
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  };

  public withDrawalFunds = async (payload: withDrawalPayload) => {
    try {
      const response = await this.flw.Transfer.initiate(payload);
      return {
        response,
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  };

  public walletToWalletTransfer = async (
    payload: walletToWalletTransferPayload
  ) => {
    try {
      const response = await this.flw.Transfer.wallet_to_wallet(payload);
      return {
        response,
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  };
}
