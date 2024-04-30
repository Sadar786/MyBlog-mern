import express from 'express'
import  {signUp, signin}  from '../controllers/auth.controller.js';
const AuthRouter = express.Router();

AuthRouter.post("/api/signup", signUp)
AuthRouter.post("/api/signin", signin)

export default AuthRouter;