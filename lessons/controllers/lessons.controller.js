import LessonService from '../services/lesson.service.js';
import {validationResult} from 'express-validator';
import { LessonsError } from '../errors/lessons.errors.js';

class LessonController {

    async getLessons(req, res, next) {
        try {
            const lessons = await LessonService.getLessons(req.params);
            return res.status(200).json(lessons);
        } catch (error) {
            console.log(error.message)
            next(error);
        };
    };

    async getOneLesson(req, res, next) {
        try {
            const lesson = await LessonService.getOneLesson(req.params.id, req.params.userId);
            return res.status(200).json(lesson);
        } catch (error) {
            next(error);
        };
    };

    async createLesson(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                next(LessonsError.BadRequest('Ошибка валидации', errors.array()));
            };
            const newLesson = await LessonService.createLesson(req.body);
            return res.status(200).json(newLesson);
        } catch (error) {
            next(error);
        };
    };

    async updateLesson(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                next(LessonsError.BadRequest('Ошибка валидации', errors.array()));
            };
            const updatedLesson = await LessonService.updateLesson(req.params.id, req.body);
            return res.status(200).json(updatedLesson);
        } catch (error) {
            next(error);
        };
    };

    async likeLesson(req, res, next) {
        try {
            const likedLesson = await LessonService.likeLesson(req.params.id, req.body.userId);
            return res.status(200).json(likedLesson);
        } catch (error) {
            next(error);
        };
    };

    async deleteLesson(req, res, next) {
        try {
            const deletedLesson = await LessonService.deleteLesson(req.params.id);
            return res.status(200).json(deletedLesson);
        } catch (error) {
            next(error);
        };
    };


};

export default new LessonController();