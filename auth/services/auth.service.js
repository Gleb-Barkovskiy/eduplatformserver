import {User} from '../models/user.model.js';
import {UserDto} from '../dtos/user.dto.js';
import bcrypt from 'bcryptjs';
import TokenService from './token.service.js';
import { AuthError } from '../errors/auth.errors.js';


class AuthService {

    async createUser(userCreationData) {
        const {firstName, lastName, email, password} = userCreationData;  

        if (await User.findOne({email})) {
            throw AuthError.BadRequest("Такой пользователь уже существует");
        };
        
        const hashedPassword = bcrypt.hashSync(password, 5);
        const user = await User.create({firstName, lastName, email, password: hashedPassword});

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    };

    async loginUser(userLoginData) {
        const {email, password} = userLoginData;

        const user = await User.findOne({email});

        if(!user) {
            throw AuthError.BadRequest("Такого пользователя не существует");
        };

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if(!isPasswordValid) {
            throw AuthError.BadRequest("Неправильный пароль");
        };

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    };

    async logoutUser(refreshToken) {
        try {
            const data = await TokenService.deleteToken(refreshToken);
            return data;
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw AuthError.Unauthorized();
        };
        const tokenData = await TokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await TokenService.findTokenInDatabase(refreshToken);
        if(!tokenInDb || !tokenData) {
            throw AuthError.Unauthorized();
        };

        const user = await User.findById(tokenData.id);
        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    };
    
};


export default new AuthService();