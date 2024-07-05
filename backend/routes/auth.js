const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//API for registration
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).json({ message: "username already exists" });
    }
    const user = new User({ email, username, password: hashpassword });
    await user.save().then(() => res.status(200).json({ user: user }));
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in sending data to backend" });
  }
});

//Sign In
router.post("/signin", async (req, res) => {
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
      res.status(400).json({ message: "password is incorrect" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ others });

  } catch (error) {
    console.log(error);
    res.status(400).json({message:"Error"});
  }
});

module.exports = router;
