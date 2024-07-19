import express from "express";
import { addTodo, deleteTodo, updateTask, getTasks, toggleCompleteStatus } from "../controllers/todo-controller.js";
import {ensureAccess} from '../middlewares/account-auth.js';


const router = express.Router(); 
//create Task
router.post("/",ensureAccess, addTodo);

//Update Task
router.put("/:id",ensureAccess, updateTask );

//Delete Task
router.delete("/:id",ensureAccess, deleteTodo);

//getTask
router.get("/:id",ensureAccess, getTasks);

//toggleCompleted
router.patch("/:id" ,ensureAccess, toggleCompleteStatus);

export default router;
