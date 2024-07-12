const mongoose  = require("mongoose");
 

const conn = async (req,res) =>{
    // console.log("check");
    try {
        await mongoose
    .connect("mongodb+srv://suraj_todo:suraj_todo@cluster0.0m7sywh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Connected");
    });
    }
    catch (error) {
        res.status(400).json({
            message:"not connected",
        });
    } 

};
conn(); 