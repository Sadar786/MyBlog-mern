import express from 'express'
const UserRouter = express.Router();
import { test } from '../controllers/user.controllers.js';

UserRouter.get('/test',test)

export default UserRouter;