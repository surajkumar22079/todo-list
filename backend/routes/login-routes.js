import express from "express";
const router = express.Router();  
import { createAccessToken } from "../controllers/login-controllers.js";




//Sign In
router.post("/access-tokens", createAccessToken );

export default router;
