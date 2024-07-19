import express from "express";
const router = express.Router(); 
import { createUser } from "../controllers/user-controller.js";

//API for registration
router.post("/accounts", createUser);


export default router;