import express from "express";
import { addTodo, deleteTodo, updateTask, getTasks } from "../controllers/todo-controller.js";
import {ensureAccess} from '../middlewares/account-auth.js';


const router = express.Router(); 
//create Task
router.post("/addTask",ensureAccess, addTodo);

//Update Task
router.put("/updateTask/:id",ensureAccess, updateTask );

//Delete Task
router.delete("/deleteTask/:id",ensureAccess, deleteTodo);

//getTask
router.get("/getTask/:id",ensureAccess, getTasks);

export default router;
