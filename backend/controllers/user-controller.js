import User from "../models/user-db.js";
import bcrypt from "bcryptjs"; 

//API to create account of the User
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({existingUser});
    }

    const user = new User({
      firstName,
      lastName,
      email,
      hashedPassword: hashpassword,
    });
    await user.save(); 
      return res.status(201).json({user })
     
  } catch (error) { 
    res.status(500).json;
  }
};
