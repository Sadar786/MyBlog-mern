//gpt modified code 
import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js';
import { errorHandler } from "../utils/error.js";

export const test = async (req, res) => {
    res.json({ message: "the app is running successfully!" });
};

export const updateUser = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.userId) {
            return next(errorHandler(400, "You are not authorized!"));
        }

        const { username, email, password, profilePicture } = req.body;

        if (password && password.length < 6) {
            return next(errorHandler(400, "Password must be greater than 6 characters"));
        }

        if (username.length < 7 || username.length > 20) {
            return next(errorHandler(400, "Username must be between 7 and 20 characters"));
        }
        
        if (username !== username.toLowerCase()) {
            return next(errorHandler(400, "Username must be in lower case"));
        }

        if (username.includes(' ')) {
            return next(errorHandler(400, "Username should not contain spaces"));
        }

        if (!username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username should not contain special characters"));
        }

        const hashedPassword = password ? await bcryptjs.hash(password, 10) : undefined;

        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username,
                email,
                password: hashedPassword,
                profilePicture
            }
        }, { new: true });

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password: userPassword, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
      if(req.user.id !== req.params.userId){
        return next(errorHandler(403, "you are not allowed to delete acount, because you are not authorized user."))
      }
      try {
          await User.findByIdAndDelete(req.params.userId)
          res.status(200).json({message: "User deleted successfully."})
          next();
        
      } catch (error) {
        next(error)
      }
}

export const signOut = async (req, res, next) =>{
    try {
        await res.clearCookie('access_token').status(200).json({message: "Sign Out Successfully."})
    } catch (error) {
        next(error)
    }
}