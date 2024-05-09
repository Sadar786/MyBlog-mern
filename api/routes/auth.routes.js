import express from 'express'
import  {signUp, signin, googleAuth}  from '../controllers/auth.controller.js';
const AuthRouter = express.Router();

AuthRouter.post("/api/signup", signUp)
AuthRouter.post("/api/signin", signin)
AuthRouter.post("/api/googleAuth", googleAuth)

export default AuthRouter;