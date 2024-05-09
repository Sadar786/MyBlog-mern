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
        type: String,
        require: true,
    },
    profilePicture : {
        type: String,
        default: "https://i.pinimg.com/736x/54/72/d1/5472d1b09d3d724228109d381d617326.jpg"
    },
},
    { timestamps: true }

)

const User = mongoose.model("User", userSchema)
export default User;