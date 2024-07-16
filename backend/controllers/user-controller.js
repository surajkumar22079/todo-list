import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//API to create account
export const createAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User Already Registered" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashpassword,
    });
    await user.save();
    
    const accessToken = jwt.sign(
      {
        user: user,
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      {
        expiresIn: "3600m",
      }
    );
      return res.status(201).json({user, accessToken ,  message: "User Signed up Successfully" })
     
  } catch (error) { 
    res.status(500).json({ message: "Internal server error" });
  }
};
