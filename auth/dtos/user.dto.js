export class UserDto {
    id;
    firstName;
    lastName;
    email;
    subscribers;
    constructor(model) {
        this.id = model._id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.email = model.email;
        this.subscribers = model.subscribers;
    };
};