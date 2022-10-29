import express from "express";
import {
  getUserChats,
  CreateChat,
  getCurrentUserChats,
} from "../controllers/ChatController.js";

const router = express.Router();

router.get("/api/chats/:userId", getUserChats);
router.get("/api/chats/:senderId/:receiverId", getCurrentUserChats);
router.post("/api/chats", CreateChat);

export default router;
