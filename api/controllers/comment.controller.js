// comment.controller.js

import { errorHandler } from "../utils/error.js";
import Comment from '../models/comment.model.js'



export const createComment = async (req, res, next) => {
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

export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({postId: req.params.postId}).sort({createAt: -1})
    if(comments.length>0){
      res.status(200).json(comments);
    }
    else{
      res.status(500).json({message: "something want wrong"})
    }
  } catch (error) {
    next(error)
  }
}