import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../middleware/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

export const Register = asyncHandler(async (req, res) => {
  const { username, email, password, profilePicture } = req.body;
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

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    profilePicture,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      profilePicture:user.profilePicture,
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
export const handleUpload = async (req, res) => {
  try {
    const fileStr = req.body.data;
    console.log(fileStr);
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      cloud_name: "esaie",
      api_key: "158671153929188",
      api_secret: "sPwHT8I-oE1wFExMajUdBAr1iZQ",
      resource_type: "image",
      upload_preset: "chat-app",
    });
    console.log(uploadResponse);
    res.json({ msg: "File uploaded sucessfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};
export const getUsersProfile = async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:cloudinary_react")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
};
