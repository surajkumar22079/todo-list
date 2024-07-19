import express from "express";
const router = express.Router();  
import { createAccessToken } from "../controllers/access-token-controllers.js";




//Sign In
router.post("/access-tokens", createAccessToken );

export default router;
