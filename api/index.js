import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';
import AuthRouter from './routes/auth.routes.js';

const app = express();
app.use(express.json())

dotenv.config();


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
app.use('/', AuthRouter)


app.use((error, req, res, next) =>{
    const statusCode = error.statusCode || 500;
    const massage = error.massage || "server internal error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        massage
    })
})