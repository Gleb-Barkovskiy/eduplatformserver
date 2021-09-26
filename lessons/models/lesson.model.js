import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},

    poster: {type: String, required: true},
    video: {type: String, required: true},

    tags: {type: [String], required: true},
    views: {type: [String], required: true,default: []},
    likes: {type: [String], required: true, default: []},

    authorName: {type: String, required: true},
    authorId: {type: String, required: true},
    createdAt: {type: Date, default: new Date()},
});

export const Lesson = mongoose.model('Lesson', LessonSchema);
