import { User } from "../models/UserSchema.js";
import { CatchAsyncError } from "./CatchAsyncError.js";
import ErrorHandler from "./errorMiddlewares.js";
import jwt from "jsonwebtoken";


// General Role-Based Authentication Middleware
const isAuthenticated = (role) =>
  CatchAsyncError(async (req, res, next) => {
    const token = req.cookies[`${role.toLowerCase()}Token`];

    if (!token) {
      return next(new ErrorHandler(`${role} is not authenticated!`, 401)); 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404)); 
    }

    if (req.user.role !== role) {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resource!`,
          403 // 403: Forbidden
        )
      );
    }

    next();
  });

  
  

export const isAdminAuthenticated = isAuthenticated("Admin");
export const isPatientAuthenticated = isAuthenticated("Patient");
export const isDoctorAuthenticated = isAuthenticated("Doctor");
