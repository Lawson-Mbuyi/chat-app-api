import express from "express";
import {
  getUserChats,
  getChaters,
  CreateChat,
} from "../controllers/ChatController.js";

const router = express.Router();

router.get("/api/chats/:userId", getUserChats);
router.get("/api/chats/:senderId/:receiverId", getChaters);
router.post("/api/chats", CreateChat);

export default router;
