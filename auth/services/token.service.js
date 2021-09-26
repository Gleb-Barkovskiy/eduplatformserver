import jwt from 'jsonwebtoken';
import {Token} from '../models/token.model.js';

class TokenService {

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});
        return {accessToken, refreshToken};
    };

    async saveToken(userId, refreshToken){
        const tokenInfo = await Token.findOne({user: userId});
        if(tokenInfo){
            tokenInfo.refreshToken = refreshToken;
            return tokenInfo.save();
        };
        const token = await Token.create({user: userId, refreshToken});
        return token;
    };

    async findTokenInDatabase(refreshToken) {
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    };

    async validateAccessToken(token) {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return tokenData; 
        } catch (error) {
            return null;
        };
    };

    async validateRefreshToken(token) {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return tokenData;
        } catch (error) {
            return null;
        };
    };

    async deleteToken(refreshToken){
        const data = await Token.deleteOne({refreshToken});
        return data;
    };
};

export default new TokenService();