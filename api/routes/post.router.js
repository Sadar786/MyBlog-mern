import express from 'express'
import {verifyUser} from '../utils/verifyUser.js'
const postRouter = express.Router();
import {createPost, getPosts} from '../controllers/post.controller.js'
import {} from '../controllers/post.controller.js'
const app = express();


postRouter.post('/createPost', verifyUser , createPost)
postRouter.get('/getPosts',  getPosts)

export default postRouter;