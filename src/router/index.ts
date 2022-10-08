import { Router } from 'express';
import { registerNewUser as registerNewUserController } from '../controller/auth/signup.auth';
import { loginUser as loginUserController } from '../controller/auth/login.auth';

class Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }


    private initializeRoutes() {
        this.router.post('/register', registerNewUserController);
        this.router.post('/login', loginUserController);
    }
}

export default Route;