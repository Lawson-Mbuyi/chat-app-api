import User from "../models/userModel.js";
import express from "express";
import passport from "passport";
import { authFilter } from "../middleware/authFilter.js";

import {
  Register,
  getUserById,
  getUsers,
  handleUpload,getUsersProfile
} from "../controllers/authController.js";

const router = express.Router();

router.get("/api/users/:userId", getUserById);
router.get("/api/users/all/:userId", getUsers);
router.post("/api/users", Register);
router.get('/api/users/images',getUsersProfile)
router.post("/api/users/login", authFilter);
router.post("/api/users/upload",handleUpload)


export default router;
