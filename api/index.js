import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.routes.js';
import postRouter from './routes/post.router.js';
import commentRouter from './routes/comment.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

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

const __dirname = path.resolve();

app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})
app.use((error, req, res, next) =>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "server internal error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})