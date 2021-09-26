import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},

    email: {unique: true, type: String, required: true},
    password: {type: String, required: true},

    subscribers: {type: [String], default: []},  
});

export const User = mongoose.model('User', UserSchema);