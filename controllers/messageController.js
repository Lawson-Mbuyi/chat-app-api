import Message from "../models/MessageModel.js";
import asyncHandler from "express-async-handler";

export const CreateMessage = async (req, res) => {
  const { chatId, senderId, messageText,secureUrl } = req.body;
  const message = new Message({
    chatId,
    senderId,
    messageText,
    secureUrl,
  });
  try {
    const response = await message.save();
    res.status(201).json(response);
  } catch (e) {
    res.status(500).json(e);
  }
};
export const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const response = await Message.find({chatId: chatId });
  if (response) {
    res.status(200).json(response);
  } else {
    throw new Error("this's your first chat");
  }
});
