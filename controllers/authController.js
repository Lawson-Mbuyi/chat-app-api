import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../middleware/generateToken.js";
import { config } from "../config.js";

export const Register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("please enter all the field");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("This user already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // const result = await cloudinary.uploader.upload(req.file.path);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    // profilePicture: result.secure_url,
    // cloudinary_id: result.public_id,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const userExists = await User.findById({ _id: userId });
    res.status(200).json(userExists);
  } catch (error) {
    res.status(400).json({ message: "this user doesn't exists" });
  }
});
export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: "Aucun utilisateur trouvé" });
  }
});
