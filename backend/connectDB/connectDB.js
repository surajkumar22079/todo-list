import mongoose from "mongoose";
 

export const conn = async (req,res) =>{ 
    try {
        await mongoose.connect("mongodb+srv://suraj_todo:suraj_todo@cluster0.rhvwxr1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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