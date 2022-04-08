import express from 'express';
import LessonController from './controllers/lessons.controller.js';
import {authMiddleware} from '../auth/middleware/auth.middleware.js';
import {check} from 'express-validator';
const lessonsRouter = express.Router();


lessonsRouter.get('/lessons/:field*?/:value*?', LessonController.getLessons);
lessonsRouter.get('/lesson/:id/:userId*?', LessonController.getOneLesson);

lessonsRouter.post('/lesson/create', [authMiddleware,
    check('title', 'Поле не должно быть пустым').notEmpty(),
    check('description', 'Поле не должно быть пустым').notEmpty(),
    check('poster', 'Поле не должно быть пустым').notEmpty(),
    check('video', 'Поле не должно быть пустым').notEmpty(),
    check('tags', 'Поле не должно быть пустым').notEmpty(),
    check('authorName', 'Поле не должно быть пустым').notEmpty(),
    check('authorId', 'Поле не должно быть пустым').notEmpty()
], LessonController.createLesson);

lessonsRouter.put('/lesson/like/:id', authMiddleware, LessonController.likeLesson);

lessonsRouter.put('/lesson/update/:id', [authMiddleware,
    check('title', 'Поле не должно быть пустым').notEmpty(),
    check('description', 'Поле не должно быть пустым').notEmpty(),
    check('poster', 'Поле не должно быть пустым').notEmpty()
], LessonController.updateLesson);
lessonsRouter.delete('/lesson/:id', authMiddleware, LessonController.deleteLesson);

export default lessonsRouter;
