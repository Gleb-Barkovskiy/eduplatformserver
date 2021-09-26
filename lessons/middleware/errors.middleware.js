import {LessonsError} from '../errors/lessons.errors.js';

export const authErrorsMiddleware = (error, req, res, next) => {
    if (error instanceof LessonsError) {
        return res.status(error.status).json({
            message: error.message,
            errors: error.errors,
        });
    };
    return res.status(500).json({message: 'Ошибка на стороне сервера'});
};