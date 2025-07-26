import jwt from 'jsonwebtoken';
import { adminModel } from '../../modules/admin/admin.model.js';
import { userModel } from '../../modules/user/user.model.js';
import AppError from '../services/AppError.js';

export const isAdmin = async (req, res, next) => {
  let token = req.header("token");
  if (!token) return res.status(400).json({ message: "token not found" })
  jwt.verify(token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) return res.status(400).json({ message: "invaild token", err })
      const user_data = await adminModel.findOne({ _id: decoded.id });
      if (!user_data) return res.status(401).json({ success: false, message: "ليس لديك صلاحية للقيام بهذه العملية" })
      req.admin = user_data;
      next()
    })
}

export const isLogin = async (req, res, next) => {
  let token = req.header("token");
  if (!token) return res.status(400).json({ message: "token not found" })

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(400).json({ message: "Invaild token", err });

    const [user, admin] = await Promise.all([
      userModel.findOne({ _id: decoded.id }),
      adminModel.findOne({ _id: decoded.id })
    ]);

    const user_data = user ?? admin;

    if (!user_data) return res.status(404).json({ message: "User not Found" })
    req.user = user_data;
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