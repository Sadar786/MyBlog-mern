import express from 'express'
import  {signUp}  from '../controllers/auth.controller.js';
const AuthRouter = express.Router();

AuthRouter.post("/signup", signUp)

export default AuthRouter;