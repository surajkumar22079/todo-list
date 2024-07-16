import express from "express";
const router = express.Router();  
import { createAccessToken } from "../controllers/login-controllers.js";




//Sign In
router.post("/signin", createAccessToken );

export default router;
