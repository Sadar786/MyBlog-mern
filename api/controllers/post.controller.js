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


export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const query = {};
        
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.slug) {
            query.slug = req.query.slug;
        }
        if (req.query.postId) {
            query._id = req.query.postId;
        }
        if (req.query.searchTerm) {
            query.$or = [
                { title: { $regex: req.query.searchTerm, $options: 'i' } },
                { content: { $regex: req.query.searchTerm, $options: 'i' } }
            ];
        }

        const posts = await Post.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });

    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req, res, next) => {

    const { user } = req;
    const { postId, userId } = req.params;

    if (!user.isAdmin && user.id !== userId) {
        return next(errorHandler(403, "You are not allowed to delete this post!"));
    }

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        
        if (!deletedPost) {
            return next(errorHandler(404, "Post not found!"));
        }

        res.status(200).json({ message: "Post has been deleted successfully!" });
        console.log("Post deleted successfully");
    } catch (error) {
        console.error("Error deleting post:", error);
        next(errorHandler(500, "An error occurred while deleting the post."));
    }
};




export const updatePost = async (req, res, next) =>{
    console.log(req.params.userId)
   
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
      next(errorHandler(403, "you are not Authurized to update post."))
      return ;
    }

    const {title, content, category, image} = req.body;

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (content) updatedFields.content = content;
    if (category) updatedFields.category = category;
    if (image) updatedFields.image = image;
    

    try {
        
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: updatedFields

            },
            {new: true}
        )
        if(!updatedPost){
            next(errorHandler(401, "some error occured."))
        }
        else{
            res.status(200).json(updatedPost);

        }
        
    } catch (error) {
        next(errorHandler(500, "An Error occurred while updating post."+ error.message))
        
    }
}