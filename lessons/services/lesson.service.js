import {Lesson} from '../models/lesson.model.js';
import {LessonsError} from '../errors/lessons.errors.js';
import {LessonDto} from '../dtos/lesson.dto.js';

class LessonService {

    async getLessons(filter) {
        if(filter.field) {
            const value = filter['0'].substr(1).split(' ');
            let lessons = [];
            switch (filter.field) {
                case "likes":
                    lessons = await Lesson.find({likes: value}).sort({createdAt: "descending"});
                    return lessons;
                case "views":
                    lessons = await Lesson.find({views: value}).sort({createdAt: "descending"});
                    return lessons;
                case "authorId":
                    lessons = await Lesson.find({authorId: value}).sort({createdAt: "descending"});
                    return lessons;
                case "tags":
                    lessons = await Lesson.find({tags: {$in: value}}).sort({createdAt: "descending"});
                    return lessons;
            };
        };
        const lessons = await Lesson.find().sort({createdAt: "descending"});
        return lessons;
    };

    async getOneLesson(_id, userId) {
        const viewedlesson = await Lesson.findOne({_id});
        const lesson = new LessonDto(viewedlesson);
        if(!lesson) {
            throw LessonsError.None();
        };
        if(userId && lesson.views.indexOf(userId) === -1) {
            lesson.views.push(userId);
            await Lesson.updateOne({_id}, {"views": lesson.views});
        };
        const newlesson = await Lesson.findOne({_id});
        return newlesson;
    };

    async createLesson(newLesson) {
        newLesson.tags = newLesson.tags.toLowerCase().split(' ');
        const lesson = await Lesson.create(newLesson);
        return lesson;
    };

    async updateLesson(_id, updatedData) {
        const {title, description, poster} = updatedData;
        await Lesson.updateOne({_id}, {"title": title, "description": description, "poster": poster});
        const lesson = await Lesson.findOne({_id});
        return lesson;
    };

    async likeLesson(_id, userId) {
        const likedLesson = await Lesson.findOne({_id});
        const lesson = new LessonDto(likedLesson);
        if (lesson.likes.indexOf(userId) === -1) {
            lesson.likes.push(userId);
        } else {
            lesson.likes.remove(userId);
        };
        await Lesson.updateOne({_id}, {"likes": lesson.likes});
        const newlesson = await Lesson.findOne({_id});
        return newlesson;
    };

    async deleteLesson(_id) {
        const lesson = await Lesson.deleteOne({_id});
        if (!lesson) {
            throw LessonsError.None();
        };
        return lesson;
    };

};

export default new LessonService();