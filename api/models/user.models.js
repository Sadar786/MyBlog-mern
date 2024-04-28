import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        tupe: String,
        require: true,
    }}, 
    {timestamps: true}
)

const User = mongoose.model("User", userSchema)
export default User;