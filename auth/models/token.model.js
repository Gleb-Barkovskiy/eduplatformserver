import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
});

export const Token = mongoose.model('Token', TokenSchema);