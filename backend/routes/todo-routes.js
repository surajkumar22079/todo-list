import express from "express";
import { addTodo, deleteTodo, updateTask, getTasks, toggleCompleteStatus } from "../controllers/todo-controller.js";
import {ensureAccess} from '../middlewares/account-auth.js';


const router = express.Router(); 
//create Task
router.post("/todo",ensureAccess, addTodo);

//Update Task
router.put("/todo/:id",ensureAccess, updateTask );

//Delete Task
router.delete("/todo/:id",ensureAccess, deleteTodo);

//getTask
router.get("/todo/:id",ensureAccess, getTasks);

//toggleCompleted
router.patch("/todo/:id" ,ensureAccess, toggleCompleteStatus);

export default router;
