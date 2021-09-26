export class LessonDto {
    id;
    title;
    description;
    poster;
    video;
    tags;
    views;
    likes;
    authorName;
    authorId;
    createdAt;
    constructor(model) {
        this.id = model._id;
        this.title = model.title;
        this.description = model.description;
        this.poster = model.poster;
        this.video = model.video;
        this.tags = model.tags;
        this.views = model.views;
        this.likes = model.likes;
        this.authorName = model.authorName;
        this.authorId = model.authorId;
        this.createdAt = model.createdAt;
    };
};