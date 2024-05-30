import express from 'express'
import {verifyUser} from '../utils/verifyUser.js'
const postRouter = express.Router();
import {createPost, getPosts, deletePost} from '../controllers/post.controller.js'
import {} from '../controllers/post.controller.js'
const app = express();


postRouter.post('/createPost', verifyUser , createPost)
postRouter.get('/getPosts',  getPosts)
postRouter.delete('/deletePost/:postId/:userId', verifyUser, deletePost)

export default postRouter;