import express from 'express'
import {verifyUser} from '../utils/verifyUser.js'
const postRouter = express.Router();
import {createPost} from '../controllers/post.controller.js'
const app = express();


postRouter.post('/createPost', verifyUser , createPost)

export default postRouter;