import express from "express"
import {
  CreateMessage,
  getMessages,
} from "../controllers/messageController.js"
import { authFilter } from "../middleware/authFilter.js";

const router = express.Router();

router.get("/api/messages/:chatId", getMessages);
router.post("/api/messages", CreateMessage);

export default router;
