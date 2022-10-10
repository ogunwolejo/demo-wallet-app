import config from 'config';
import axios from 'axios';
import { createVirtualAccountPayload, getVirtualAccountNumberPayload } from '../interface/flutterwave.interface';

let flutterwave = require('flutterwave-node-v3');





export class FlutterWave {
    public flw:any;
    private publicKey = config.get("flutterwaveKeys.publicApiKey");
    private secretKey = config.get("flutterwaveKeys.secretApiKey");
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
                data: response.data
            }
        } catch (error) {
            return {
                status: 'error',
                error
            }
        } 
    }


    public async getVirtualAccountNumber(payload: getVirtualAccountNumberPayload) {
        try {
            const response = await this.flw.VirtualAcct.fetch(payload);
            return {
                status: 'successful',
                response
            }
        } catch (error) {
            return {
                status: 'error',
                error
            }
        }
    }


    public fetchBal = async () => {
        try {
            const response = await this.flw.Misc.bal()
            return {
                status: 'successful',
                response
            }
        } catch (error) {
            return {
                status: 'error',
                error
            }
        }

    }
}