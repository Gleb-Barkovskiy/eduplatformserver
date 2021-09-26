import {AuthError} from '../errors/auth.errors.js';
import TokenService from '../services/token.service.js';

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(AuthError.Unauthorized());
        };

        const token = authHeader.split(' ')[1];
        if (!token) {
            return next(AuthError.Unauthorized());
        };

        const tokenData = TokenService.validateAccessToken(token);

        if(!tokenData) {
            return next(AuthError.Unauthorized());
        };

        req.user = tokenData;
        next();
    } catch (error) {
        return next(AuthError.Unauthorized());
    };
};