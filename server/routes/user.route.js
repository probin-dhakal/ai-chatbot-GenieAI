import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

router.get("/logout", isAuthenticated, logout);
router.post("/profile", isAuthenticated, getMyProfile);

export default router;
