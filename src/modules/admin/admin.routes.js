// src/routes/admin/admin.routes.js
import express from "express";
import {
  addAdmin,
  checkAdmin,
  deleteAdmin,
  deleteUser,
  getAllAdmins,
  getAllUsers,
  loginAdmin
} from "./admin.controller.js";
import { isAdmin } from "../../utils/middleware/auth.js";
import { addAdminSchema, idParamSchema, loginAdminSchema } from "./admin.valdation.js";
import { valdation } from "../../utils/middleware/valdation.js";

const AdminRouter = express.Router();

// إضافة أدمن جديد
AdminRouter.post(
  "/add",
  valdation(addAdminSchema),
  addAdmin
);

// تسجيل دخول أدمن
AdminRouter.post(
  "/login-admin",
  valdation(loginAdminSchema),
  loginAdmin
);

// التحقق من صلاحية الأدمن
AdminRouter.get(
  "/is-admin",
  isAdmin,
  checkAdmin
);

// جلب كل المستخدمين
AdminRouter.get(
  "/users",
  isAdmin,
  getAllUsers
);

// جلب كل الأدمنز
AdminRouter.get(
  "/admins",
  isAdmin,
  getAllAdmins
);

// حذف مستخدم (يتحقق أولاً من صحة الـ id)
AdminRouter.delete(
  "/user/:id",
  isAdmin,
  valdation(idParamSchema),
  deleteUser
);

// حذف أدمن (يتحقق أولاً من صحة الـ id)
AdminRouter.delete(
  "/admin/:id",
  isAdmin,
  valdation(idParamSchema),
  deleteAdmin
);

export default AdminRouter;
