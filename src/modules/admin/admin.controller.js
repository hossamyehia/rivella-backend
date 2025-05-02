import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { adminModel } from '../../../database/models/admin.model.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import AppError from '../../utils/services/AppError.js';
import { userModel } from '../../../database/models/user.model.js';

export const addAdmin = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Name, email and password are required.', 400));
  }

  const existing = await adminModel.findOne({ email });
  if (existing) {
    return next(new AppError('Email is already registered.', 409));
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.ROUNDED));
  const admin = await adminModel.create({ name, email, password: hashedPassword });

  res.status(201).json({
    message:"success",
    data: {
      _id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
});

export const loginAdmin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password are required.', 400));
  }

  const admin = await adminModel.findOne({ email });
  if (!admin) {
    return next(new AppError('Invalid email or password.', 401));
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return next(new AppError('Invalid email or password.', 401));
  }

  const token = jwt.sign({ id: admin._id, email: admin.email,name:admin.name }, process.env.JWT_SECRET);

  res.status(200).json({
    message:"success",
    token,
    data: {
      _id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
});



export const checkAdmin=async(req,res)=>{
  res.json({success:true});
}


export const getAllUsers=
catchAsyncError(
  async(req,res)=>{
    let data=await userModel.find().select("-password");
    res.json({success:true,data});
  }
  )
export const getAllAdmins=
catchAsyncError(
  async(req,res)=>{
    let data=await adminModel.find().select("-password");
    res.json({success:true,data});
  }
  )


export const deleteUser=catchAsyncError(async(req,res,next)=>{
  let user=await userModel.findOne({_id:req.params.id});
  if(!user) return next(new AppError("user not found",404));
  await user.deleteOne({});
  res.json({success:true});
})
export const deleteAdmin=catchAsyncError(async(req,res,next)=>{
  let admin=await adminModel.findOne({_id:req.params.id});
  if(!admin) return next(new AppError("admin not found",404));
  await admin.deleteOne({});
  res.json({success:true});
})