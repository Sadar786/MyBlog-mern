// commentRouter.js
import express from 'express';
import { createComment, getComment, likeComment, editComment ,deleteComment ,getTotalComment} from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const commentRouter = express.Router();

commentRouter.post('/createComment',verifyUser, createComment);
commentRouter.get('/getComment/:postId', getComment);
commentRouter.put('/likeComment/:commentId', verifyUser, likeComment);
commentRouter.put('/editComment/:commentId', verifyUser, editComment);
commentRouter.delete('/deleteComment/:commentId', verifyUser, deleteComment);
commentRouter.get('/getComments' ,verifyUser, getTotalComment)

export default commentRouter;
