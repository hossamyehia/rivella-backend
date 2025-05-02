import  jwt from 'jsonwebtoken';
import { adminModel } from '../../../database/models/admin.model.js';
import { userModel } from '../../../database/models/user.model.js';
import AppError from '../services/AppError.js';
export const isAdmin=async(req,res,next)=>{
    let token= req.header("token");
    jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
        if(err) return res.status(400).json({message:"invaild token",err})
        const user_data=await adminModel.findOne({_id:decoded.id});
    if(!user_data) return res.status(400).json({message:"invaild token"})
    req.admin=user_data;
    next()
    })
}

export const isLogin=async(req,res,next)=>{
    let token= req.header("token");
    jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
        if(err) return res.status(400).json({message:"invaild token",err})
        const user_data=await userModel.findOne({_id:decoded.id});
    if(!user_data) return res.status(400).json({message:"invaild token"})
    req.user=user_data;
    next()
    })
}
export const isLoginOptional = async (req, res, next) => {
    const token = req.header('token');
    
    if (!token) {
      return next();
    }
  
    try {
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      if (!user) {
        return next(new AppError('Invalid token: user not found', 401));
      }
     
      req.user = user;
      next();
    } catch (err) {
     
      return next(new AppError('Invalid token', 401));
    }
  };