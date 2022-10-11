import { NextFunction, Request, Response } from 'express';
import {
  fundAccountPayload,
  walletToWalletTransferPayload,
  withDrawalPayload,
} from '../../interface/flutterwave.interface';
import { HttpException } from '../../utils/exception';
import { FlutterWave } from '../../utils/flutterwave';
import ValidateService from '../../services/validation.service';

const flw = new FlutterWave();
const vS = new ValidateService();

export const getAllBanks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await flw.getAllBanks();
    if (!response.response) {
      return next(new HttpException(400, 'Could not get list of Banks'));
    }

    const result: [{ bankCode: string; bankName: string }] =
      response.response.data.map((el: any) => {
        return { bankCode: el.code, bankName: el.name };
      });

    return res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const withDrawalFundsToABank = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { account_bank_code, account_number, amount, narration },
  } = req;
  
  const v = vS.withDrawFundsValidationSchema(account_bank_code, account_number, amount, narration);
  if (v.error) {
    return res.status(400).json({ message: v['error'] });
  }

  try {
    const payload: withDrawalPayload = {
      account_bank: account_bank_code,
      account_number: account_number,
      amount,
      narration,
      currency: 'NGN',
      reference: 'transfer-' + Date.now(),
      callback_url: 'https://www.flutterwave.com/ng/',
      debit_currency: 'NGN',
    };
    const response = await flw.withDrawalFunds(payload);
    if (!response) {
      return next(
        new HttpException(400, 'Could not transfer to your Bank account ')
      );
    }

    return res.status(200).json({
      status: response.response.status,
      message: response.response.message,
      data: response.response.data,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const fundMyWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { wallet_number, amount, narration },
  } = req;

  const v = vS.fundWalletValidationSchema(wallet_number, amount, narration);
  if (v.error) {
    return res.status(400).json({ message: v['error'] });
  }

  try {
    const payload: fundAccountPayload = {
      account_bank: 'flutterwave',
      account_number: wallet_number, //"00118468",
      amount: amount,
      narration,
      currency: 'NGN',
      reference: 'wallet-funding-' + Date.now(),
      debit_currency: 'NGN',
    };

    const response = await flw.fundAccount(payload);

    if (!response) {
      return next(new HttpException(400, 'Unable to fund your wallet '));
    }

    return res.status(200).json({
      status: response.response.status,
      message: response.response.message,
      data: response.response.data,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const walletToWalletTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body: { merchant_id, amount, narration } } = req;
  const v = vS.walletToWalletValidationSchema(merchant_id, amount, narration);
  if (v.error) {
    return res.status(400).json({ message: v['error'] });
  }

    try {
        const payload: walletToWalletTransferPayload = {
            account_bank: "flutterwave",
            merchant_id,
            amount,
            narration,
            currency: 'NGN',
            reference: 'wallet-transfer-' + Date.now(),
            debit_currency: 'NGN',
        };

        const response = await flw.walletToWalletTransfer(payload);

        if (!response) {
            return next(new HttpException(400, 'Unable to transfer to another wallet '));
        }

        return res.status(200).json({
            status: response.response.status,
            message: response.response.message,
            data: response.response.data,
        });

    } catch (error) {
        res.status(400).json(error);
    }
};
