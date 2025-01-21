import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import { chatHandler, getChatHistory } from "../controllers/chat.controller.js";


const router = express.Router();

router.post("/message", isAuthenticated, chatHandler);
router.get("/history", isAuthenticated, getChatHistory);

 
export default router;
 