import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import Employee from "../models/Employee.js"

const addEmployee=asyncHandler(async(req,res)=>{
     const {name,email,contact,designation,gender,course} =req.body;
     const imagePath=req.file.path;

     const isDuplicate=await Employee.findOne({email});
     if(isDuplicate){
        throw new ApiError(400,"Employee with this this email is already present")
     }
   
    if (!imagePath) {
      throw new ApiError(400,"Missing Employee image")
     }
    const imageUrl = await uploadOnCloudinary(imagePath);
    if (!imageUrl) {
      throw new ApiError(
       500,
      "Something went wrong while uploading image on Cloudinary"
     );
    }
  
     const employee=await Employee.create({
        name,email,course,designation,contact,gender,image:imageUrl
     })

     if(!employee){
        throw new ApiError(500,"Server issue! Failed to add new employee")
     }
     return res.status(201).json(new ApiResponse(201,employee,"New employee created successfully"))
})

const editEmployee=asyncHandler(async(req,res)=>{
    const {data}=req.body;
    const {id}=req.params;
    const imagePath=req.file.path;

    const employee=await Employee.findById(id);

    if(!employee){
        throw new ApiError(400,"No such employee exists with this ID")
    }

    if (imagePath) {
        const imageUrl = await uploadOnCloudinary(imagePath);
        if (!imageUrl) {
            throw new ApiError(
             500,
            "Something went wrong while uploading image on Cloudinary"
           );
        }
        data.image = imageUrl;
    }  
    
    const updatedEmployee=await Employee.findByIdAndUpdate(id,{...data},{ new: true });
    if(!updatedEmployee){
        throw new ApiError(500,"Server issue! Failed to update employee")
    }
    return res.status(200).json(new ApiResponse(200,updatedEmployee,"Employee updated successfully"))
})

const deleteEmployee=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    if(!id){
        throw new ApiError(400,"Unauthorized access")
    }
    const deletedEmployee=await Employee.findByIdAndDelete(id);
    if(!deletedEmployee){
        throw new ApiError(400,"No such employee exists.")
    }
    return res.status(200).json(new ApiResponse(200,deletedEmployee,"Employee data removed successfully"))
})

const viewEmployee=asyncHandler(async(req,res)=>{
    
})
export {addEmployee,editEmployee,deleteEmployee}