import { Login } from "../models/Login.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const generateAccessToken = async (userId) => {
    try {
      const user = await Login.findById(userId);
      const accessToken = user.generateAccessToken();
      
      await user.save({ validateBeforeSave: false });
     
      return { accessToken };
    } catch (error) {
      console.log("Error while generating access token",error)
      throw new ApiError(
        500,
        "Something went wrong while generating access and refresh token"
      );
    }
};

const login =asyncHandler(async(req,res)=>{
    const {username,password}=req.body;
    if(!username||!password){
        throw new ApiError(400,"Invalid Credentials")
    }

    const user=await Login.findOne({username});
    if(!user){
        throw new ApiError(400,"No such user found with this username")
    }

    const isPasswordCorrect=await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(400,"Incorrect password, Please try again")
    }
    const { accessToken } = await generateAccessToken(user._id);

    const loggedInUser=await Login.findById(user._id).select("-password")

    return res.status(200) 
    .cookie("accessToken", accessToken, {
        maxAge:  24 * 60 * 60 * 1000,
        httpOnly: true,                
        secure: true 
    }).json(new ApiResponse(200,loggedInUser,"Login successfull"))
})

const register =asyncHandler(async(req,res)=>{
    const {username,password}=req.body;
    if(!username||!password){
        throw new ApiError(400,"Invalid Credentials")
    }

    const user=await Login.findOne({username});
    if(user){
        throw new ApiError(400,"Already have an account with this username")
    }
    const newUser=await Login.create({
        username:username,
        password:password
    })
    if(!newUser){
        throw new ApiError(500,"Server issue! Failed to create new User")
    }
    const { accessToken } = await generateAccessToken(newUser._id);
    
    const loggedInUser=await Login.findById(newUser._id).select("-password")
   
    return res.status(200) 
    .cookie("accessToken", accessToken, {
        maxAge:  24 * 60 * 60 * 1000,
        httpOnly: true,                
        secure: true 
    }).json(new ApiResponse(200,loggedInUser,"Login successfull"))
})

export {login,register}