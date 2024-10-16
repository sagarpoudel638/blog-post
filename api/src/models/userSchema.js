import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true,
    },
    email :{
        type : String,
        required: true,
        unique : true,
    },
    password:{
        type: String,
        required: true,
        select : false,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});



export const User = mongoose.model("user", userSchema);

export const createUser = async (inputUserObject)=>{
    const newUser = new User(inputUserObject)
    return await newUser.save;
}
