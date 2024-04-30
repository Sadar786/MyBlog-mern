import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.routes.js';
import SigninRouter from './routes/auth.routes.js'
import cors from 'cors';

const app = express();
app.use(express.json())

dotenv.config();
app.use(cors());


try{
 mongoose.connect(process.env.MONGO)
}
catch(err){
    console.log("error occur to connent to database"+ err)
}
app.listen(3000 , ()=>{
    console.log("app is listen on 3000")
})

app.use('/',  UserRouter)
app.use('/', SigninRouter)
app.use('/', AuthRouter)


app.use((error, req, res, next) =>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "server internal error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})