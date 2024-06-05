// comment.controller.js

import { errorHandler } from "../utils/error.js";
import Comment from '../models/comment.model.js'



export const createComment = async (req, res, next) => {
    console.log("hye create comment is called ")
  try {
    
    const {content, postId, userId} = req.body;
    
    if(userId !== req.user.id){
        return next(errorHandler(403, "Your are not allowed to create this comment"))
    }

    const newComment = new Comment({
        content,
        postId,
        userId,
    })
    await newComment.save();

    res.status(200).json(newComment)

  } catch (error) {
    next(error)
  }
};
