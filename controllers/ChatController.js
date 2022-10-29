import Chat from "../models/ChatModel.js";
import asyncHandler from "express-async-handler";

export const CreateChat = asyncHandler(async (req, res) => {
  const chat = new Chat({
    chaters: req.body,
  });
  try {
    const response = await chat.save();
    res.status(201).json(response);
  } catch (message) {
    res
      .status(500)
      .json({ message: "An error occured while creating this chat " });
  }
});

export const getUserChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      chaters: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getChaters = async (req, res) => {
  try {
    const chaters = await Chat.find({
      chaters: { $all: [req.params.senderId, req.params.receverId] },
    });
    res.status(200).json(chaters);
  } catch (e) {
    res.status(500).json(e);
  }
};
export const getCurrentUserChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      chaters: { $all: [req.params.senderId, req.params.receiverId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
