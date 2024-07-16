import express from "express";
const router = express.Router(); 
import { createAccount } from "../controllers/user-controller.js";

//API for registration
router.post("/register", createAccount);


export default router;