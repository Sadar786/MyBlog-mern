import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes.js';

const app = express();

dotenv.config();


try{
const connected = mongoose.connect(process.env.MONGO)
}
catch(err){
    console.log("error occur to connent to database"+ err)
}
app.listen(3000 , ()=>{
    console.log("app is listen on 3000")
})

app.use('/',  UserRouter)