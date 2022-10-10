process.env['NODE_CONFIG_DIR'] = __dirname + '/config';

import express, { Application  } from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import IndexRouter from './router/index';
import config from 'config';
import errorMiddleware from './middleware/error.middleware';
import db from './database';
import { FlutterWave } from './utils/flutterwave';

class App {
    private app: Application;
    private indexRouter = new IndexRouter();
    private fW = new FlutterWave();

    constructor() {
        this.app = express();
        this.initialize();
        dotEnv.config();
        this.errorMiddleware();
    }

    private initialize() {
        const port = process.env.PORT || config.get('port');
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.raw());
        this.app.use(cors());
        this.app.use('/api', this.indexRouter.router);
        this.app.listen(port, () => {
            new db();
        })
    }

    private errorMiddleware() {
        this.app.use(errorMiddleware);
    }
}

export const directory = __dirname;

export default App;
new App();