import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) =>{
        const {username, email, password} = req.body;
        if(!username || !email || !password || email === "" || email === "" || password === ""){
            return res.status(400).json({massage: "All field are required!"})
        }
        const hashPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
        try{
        await newUser.save({ wtimeout: 20000 }); 
       res.json("Sign Up successful.")
        }
        catch(err){
            console.log("error : " + err)
            next(errorHandler(400, "All fiels are required!"));
        }
}