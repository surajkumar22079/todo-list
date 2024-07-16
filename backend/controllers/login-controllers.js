import User from "../models/user.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const createAccessToken = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "Please SignUp first" });
    } 
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      { user: user },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ others, accessToken , message:"Login Successful" });
  } catch (error) { 
    res.status(500).json({ message: "Internal Server Error" });
  }
};
