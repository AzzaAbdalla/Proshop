import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../Models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  console.log("TOKEN FROM COOKIE:", req.cookies.jwt);

  if (token) {
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedUser.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, no user match the token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authanticated, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as admin");
  }
};

export { protect, admin };
