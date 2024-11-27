import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const loginSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        minlength:[4,'Password must be atleast 4 characters long']
    }

},{timestamps:true})

loginSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

loginSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

loginSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
        
    )
}

export const Login=mongoose.model('Login',loginSchema)