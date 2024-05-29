import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.routes.js';
import SigninRouter from './routes/auth.routes.js'
import postRouter from './routes/post.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();
app.use(cookieParser())



try{
 mongoose.connect(process.env.MONGO)
}
catch(err){
    console.log("error occur to connent to database"+ err)
}
app.listen(3000 , ()=>{
    console.log("app is listen on 3000")
})

app.use('/', UserRouter);
app.use('/api/user', SigninRouter);
app.use('/', AuthRouter);
app.use('/api/post', postRouter)


app.use((error, req, res, next) =>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "server internal error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})