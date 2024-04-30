import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";

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

export const signin = async (req, res, next) =>{
    const {email, password } = req.body;
    if(!email || !password || email ==='' || password === ''){
        next(errorHandler(404 , "All feilds are required."))
    }

    try{
        const vilidUser = await User.findOne({email});
        if(!vilidUser){
          return  next(errorHandler(404, "User not found."))
        }
        const vilidPassword = await bcryptjs.compareSync(password, vilidUser.password)
        if(!vilidPassword){
           return next(errorHandler(404, "Password not found."))
        }
        const {password: pass, ...rest} = vilidUser._doc;
        const token = jwt.sign({id: vilidUser._id, }, process.env.JWT_KEY);
        res.status(200).cookie('access_token', token, {
            httpOnly:true
        }).json(rest)
    }catch(err){
        next(err)
    }
}