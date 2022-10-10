export interface createVirtualAccountPayload {
    "email": string,
    "is_permanent": boolean,
    "bvn": string;
    "tx_ref": string;
}

export interface getVirtualAccountNumberPayload {
    "order_ref": string
}