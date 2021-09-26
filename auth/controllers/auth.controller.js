import AuthService from '../services/auth.service.js';
import { validationResult } from 'express-validator';
import { AuthError } from '../errors/auth.errors.js';

class AuthController {

    async createUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                next(AuthError.BadRequest('Ошибка валидации', errors.array()));
            };
            const userData = await AuthService.createUser(req.body);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.SECURE,
                path: 'https://infallible-brattain-cf3a92.netlify.app',
                SameSite: 'None',
            });
            return res.status(200).json(userData);
        } catch (error) {
            next(error);
        };
    };

    async loginUser(req, res, next) {
        try {
            const userData = await AuthService.loginUser(req.body);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.SECURE,
                path: 'https://infallible-brattain-cf3a92.netlify.app',
                SameSite: 'None',
            });
            return res.status(200).json(userData);
        } catch (error) {
            next(error);
        };
    };

    async logoutUser(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const data = await AuthService.logoutUser(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        };
    };

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const tokenData = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', tokenData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.SECURE,
            });
            return res.status(200).json(tokenData);
        } catch (error) {
            next(error);
        };
    };
    
};

export default new AuthController();