import { errorHandler } from "../utils/error.js"
// import Post from "../modules/post.model.js"
import Post from "../models/post.model.js"

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(401, "You are not allowed to create posts!"))
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please provide all required fields."))
    }

    const slug = req.body.title.split(' ').join('').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    
    try {
        const newPost = new Post({
            ...req.body, // Spread req.body instead of body
            slug,
            userId: req.user.id
        });

      const savePost = await newPost.save(); // Add await here to save the new post to the database
        res.status(201).json(savePost);
    } catch (err) {
        return next(errorHandler(500, "Could not create post. Please try again later."));
    }
}
