import User from "../models/userModel.js";
import express from "express";
import passport from "passport";
import { authFilter } from "../middleware/authFilter.js";
import {
  Register,
  getUserById,
  getUsers,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/api/users/:userId", getUserById);
router.get("/api/users", getUsers);
router.post("/api/users", Register);
router.post("/api/users/login", authFilter);
export default router;
