// commentRouter.js
import express from 'express';
import { createComment, getComment, likeComment } from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const commentRouter = express.Router();

commentRouter.post('/createComment',verifyUser, createComment);
commentRouter.get('/getComment/:postId', getComment);
commentRouter.put('/likeComment/:commentId', verifyUser, likeComment)

export default commentRouter;
