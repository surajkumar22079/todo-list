import express, { json } from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv"
import "./connectDB/connectDB.js";
// import auth from "./routes/auth-routes.js";
import todoRoutes from "./routes/todo-routes.js";
import createUserRoutes from "./routes/user-routes.js";
import loginRoutes from "./routes/login-routes.js";


dotenv.config();
app.use(json());
app.use(cors());

app.get("/" , (req,res) => {
    res.send("Hello");
});


app.use("/api/users",createUserRoutes);
app.use("/api/todos",todoRoutes);
app.use("/api" , loginRoutes);

app.listen(1000, ()=> {
    console.log("Server started")
});