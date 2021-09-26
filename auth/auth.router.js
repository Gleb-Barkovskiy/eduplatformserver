import express from 'express';
import AuthController from './controllers/auth.controller.js';
import {check} from 'express-validator';
const authRouter = express.Router();

authRouter.post('/signup',[
    check('firstName', 'Имя не должно быть пустым').notEmpty(),
    check('lastName', 'Фамилия не должна быть пуста').notEmpty(),
    check('password', 'Пароль должен быть длиннее 5 символов').isLength({min: 6}),
], AuthController.createUser);

authRouter.post('/signin', AuthController.loginUser);
authRouter.post('/signout', AuthController.logoutUser);
authRouter.get('/refresh', AuthController.refresh);

export default authRouter;
