import mongoose from "mongoose";

const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    image:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
        minlength:[10,'Contact number must be valid'],
        maxlength:[12,'Contact number must be valid']
        
    },
    designation:{
        type:String,
        required:true,
        enum:["HR","Manager","Sales"]
    },
    gender:{
        type:String,
        required:true,
        enum:["Female","Male","Other"]
    },
    course:{
        type:String,
        required:true,
        enum:["MCA","BSC","BCA"]
    }
   

},{timestamps:true})


export const Employee=mongoose.model('Employee',employeeSchema)