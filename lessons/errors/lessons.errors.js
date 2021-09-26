export class LessonsError extends Error {
    status;
    errors;

    constructor (status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    };

    static None() {
        return new LessonsError(404, 'Такого урока не существует');
    };

    static BadRequest(message, errors = []) {
        return new LessonsError(400, message, errors);
    };
    
};