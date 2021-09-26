import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import lessonsRouter from './lessons/lessons.router.js';
import authRouter from './auth/auth.router.js';
import { authErrorsMiddleware } from './auth/middleware/errors.middleware.js';


const app = express();
dotenv.config({path: `.${process.env.NODE_ENV}.env`});
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', lessonsRouter);
app.use('/auth', authRouter);
app.use(authErrorsMiddleware);


async function bootstrap() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        mongoose.set('useFindAndModify', false);
        app.listen(process.env.PORT, () => {
            console.log(`Server started on PORT: ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

bootstrap();