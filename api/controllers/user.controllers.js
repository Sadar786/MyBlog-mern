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
        return next(errorHandler(403, "you are not allowed to delete acount, because you are not authintic user."))
      }
      try {
          await User.findByIdAndDelete(req.params.userId)
          res.status(200).json({message: "User deleted successfully."})
          next();
        
      } catch (error) {
        next(error)
      }
}


//Originl code
// import { errorHandler } from "../utils/error.js";
// import bcryptjs from 'bcryptjs'
// import User from '../models/user.models.js'

// export const test = async (req, res) => {
//     res.json({ message: "the app is running successfully!" });
// }

// export const updateUser = async (req, res, next) => {
//     if (req.user.id !== req.params.userId) {
//         console.log("cookie id : "+ req.user.id)
//         console.log("req id : "+ req.params.userId)
//         return next(errorHandler(400, "You are not authorized!"));
//     }
//     if (req.body.password) {
//         if (req.body.password.length < 6) {
//             return next(errorHandler(400, "Password must be greater than 6 characters"));
//         }
//         req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     if (req.body.username.length < 7 || req.body.username.length > 20) {
//         return next(errorHandler(400, "Username must be between 7 and 20 characters"));
//     }
//     if (req.body.username !== req.body.username.toLowerCase()) {
//         return next(errorHandler(400, "Username must be in lower case"));
//     }
//     if (req.body.username.includes(' ')) {
//         return next(errorHandler(400, "Username should not contain spaces"));
//     }
//     if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
//         return next(errorHandler(400, "Username should not contain special characters"));
//     }
    
//     try {
//         console.log("User ID:", req.body.userId); // Add this line for debugging
//         console.log("name:", req.body.username); // Add this line for debugging
//         console.log("email ID:", req.body.email); // Add this line for debugging
//         const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
//             $set: {
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password,
//                 profilePicture: req.body.profilePicture
//             }
//         }, { new: true });
    
//         console.log("Updated User:", updatedUser); // Add this line for debugging
    
//         if (!updatedUser) {
//             return next(errorHandler(404, "User not found"));
//         }
    
//         const { password, ...rest } = updatedUser._doc;
//         res.status(200).json(rest);
//         next();
//     } catch (error) {
//         next(error);
//     }
    
// };
