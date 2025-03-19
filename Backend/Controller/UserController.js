import { Message } from "../models/messageSchema.js";
import {CatchAsyncError} from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {User} from "../models/UserSchema.js";
import mongoose from "mongoose";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
import { SendEmail } from "../utils/SendEmail.js";
import dotenv from "dotenv";

dotenv.config();


export const patientRegister = CatchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, password, gender, dob, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !dob || !gender || !nic || !role) {
        return next(new ErrorHandler("Please fill out the full form!", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User is already registered!", 400));
    }

    user = await User.create({ firstName, lastName, email, phone, nic, password, gender, dob, role });

    // Send Welcome Email
    try {
        await SendEmail(
            email,
            "Welcome to Virtual Health Integration!",
            `Hello ${firstName},\n\nThank you for registering on our platform. You Are registered Successfully as : ${role}.\n\nBest Regards,\nYour Team`
        );
    } catch (error) {
        console.error("Error sending email:", error.message);
    }

    generateToken(user, "User registered successfully!", 200, res);
});

export const Login=CatchAsyncError(async(req,res,next)=>{
    const {email, password,role}=req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please fill All Required Fields!",400));
    }
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or Password!",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Password not correct",400));
    }
    if(role!== user.role){
        return next(new ErrorHandler("user role does not match",400));

    }
    generateToken(user, "User Login successfully!",200,res);
});

export const AddNewAdmin=CatchAsyncError(async(req,res,next)=>{
    const {firstName,lastName,email,phone,nic,password,gender,dob,role}=
    req.body; 
    if(!firstName || !lastName|| !email|| !phone|| !password|| !dob|| !gender|| !nic){
        return next(new ErrorHandler("Please fill full form!",400));
    }
    const isRegistered=await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email already Exists!`))
    }
    const admin= await User.create({ 
        firstName,
        lastName,
        email,
        phone,
        nic,
        password,
        gender,
        dob,
        role
    });
    res.status(200).json({
        success:true,
        message:"New Admin Successfully Registerd..!"
    })
});

export const GetAllDoctors=CatchAsyncError(async(req,res,next)=>{
    const doctors= await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors,
    });
});

export const GetUsersDetails = CatchAsyncError(async (req, res, next) => {
    const patient = await User.findById(req.user.id);
    
    
  
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
  
    res.status(200).json({
      success: true,
      patient,
    });
  });

export const LogOutAdmin=CatchAsyncError(async(req,res,next)=>{
    res
    .status(200)
    .cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    })
    .json({
        success:true,
        message:"LogOut successfully!",
    });
});

export const LogOutPatient=CatchAsyncError(async(req,res,next)=>{
    res
    .status(200)
    .cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    })
    .json({
        success:true,
        message:"LogOut successfully!",
    });
});

export const LogOutDoctor=CatchAsyncError(async(req,res,next)=>{
    res
    .status(200)
    .cookie("doctorToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    })
    .json({
        success:true,
        message:"LogOut successfully!",
    });
});



export const AddNewDoctor=CatchAsyncError(async(req,res,next)=>{
    if(!req.files|| Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctors Profile Photo Required!",400));
    }
    const {docAvatar}=req.files;
    const allowedformates=["image/png","image/jpeg","image/webp"];
    if(!allowedformates.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Formate not Supported!",400));
    }
    const {firstName,lastName,email,phone,nic,password,gender,dob, doctorDepartment}=
    req.body; 
    if(!firstName || !lastName|| !email|| !phone|| !password|| !dob|| !gender|| !nic|| !doctorDepartment){
        return next(new ErrorHandler("Please fill full form!",400));
    }
    const isRegistered=await User.findOne({email});
    if(isRegistered)
    {
        return next(new ErrorHandler(`${isRegistered.role} is Already Exist with this email!`));
    }

    const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);
    if(!cloudinaryResponse||cloudinaryResponse.error){
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error||"Unknown Cloudinary Error"
        );
    }
    const doctor=await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        password,
        gender,
        dob,
        doctorDepartment,
        docAvatar:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        },
        role:"Doctor"
    });
    res.status(200).json({
        success:true,
        message:"Doctor Register Successfully!",
        doctor
    });
});

export const GetAllAdmin=CatchAsyncError(async(req,res,next)=>{
    const admin= await User.find({role:"Admin"});
    res.status(200).json({
        success:true,
        admin
    });
});
export const DoctorCounts=CatchAsyncError(async(req,res,next)=>{
    const doctorcounts=await User.countDocuments({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctorcounts,
    });
});
export const AdminCounts=CatchAsyncError(async(req,res,next)=>{
    const admincounts=await User.countDocuments({role:"Admin"});
    res.status(200).json({
        success:true,
        admincounts,
    });
});
export const deleteDoctor=CatchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    let doctor=await User.findByIdAndDelete(id);
    if(!doctor){
        return next(new ErrorHandler("Doctor Not Found",400));
    }
    res.status(200).json({
        success:true,
        message:"Doctor Deleted Successfully!"
    })

})