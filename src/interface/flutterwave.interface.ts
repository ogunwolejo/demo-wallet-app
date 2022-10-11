export interface createVirtualAccountPayload {
  email: string;
  is_permanent: boolean;
  bvn: string;
  tx_ref: string;
}

export interface getVirtualAccountNumberPayload {
  order_ref: string;
}

export interface withDrawalPayload {
  account_bank: string; //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
  account_number: string;
  amount: number;
  narration: string;
  currency: string;
  reference: string; //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
  callback_url: string;
  debit_currency: string;
}


export interface fundAccountPayload {
    "account_bank": string,
    "account_number": string,
    "amount": number,
    "narration": string,
    "currency": string,
    "reference": string,
    "debit_currency": string
}


export interface walletToWalletTransferPayload {
    "account_bank": string,
    "merchant_id": string,
    "amount": number,
    "narration": string,
    "currency": string,
    "reference": string,
    "debit_currency": string
}