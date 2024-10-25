import bcrypt from "bcryptjs";

import { createToken } from "../helper/jwt.js";
import User from "../model/userModel.js";
import { newError } from "../utils/error.js";

// sign up user => /singup
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    return next(error);
  }
};

// sign in user => /signin
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(newError("User not found", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(newError("Password is incorrect", 400));
    }

    const token = createToken(user._id);

    const cookieOptions = {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res.status(200).cookie("access_token", token, cookieOptions).json({
      success: true,
      message: "User signed in successfully",
    });
  } catch (error) {
    return next(error);
  }
};

// get user profile => /profile

export const getUserProfile = async (req, res, next) => {
  res.json({ sucess: true, user: req.user });
};

// log out user => /logout
export const logOut = async (req, res) => {
  res
    .clearCookie("access_token")
    .json({ success: true, message: "Logged out successfully" });
};

// delete user => /delete
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res
      .clearCookie("access_token")
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
