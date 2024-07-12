const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// router.post("/register", async (req, res) => {
  //   try {
    //     const { email, username, password } = req.body;
    //     const hashpassword = bcrypt.hashSync(password);
    
    //     const existingUser = await User.findOne({ email });
    //     if (existingUser) {
      //       return res.status(200).json({ message: "Email already in use" });
      //     }
      //     const existingUserName = await User.findOne({ username });
      //     if (existingUserName) {
        //       return res.status(200).json({ message: "username already exists" });
        //     }
        //     const user = new User({ email, username, password: hashpassword });
        //     await user.save().then(() => res.status(200).json({ message:"User Signed up Successfully"}));
        //   } catch (error) {
          //     console.log(error);
          //     res.status(200).json({ message: "Error in sending data to backend" });
          //   }
          // });


//API for registration
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);

    const user = new User({ email, username, password: hashpassword });
    await user
      .save()
      .then(() =>
        res.status(200).json({ message: "User Signed up Successfully" })
      );
  } catch (error) {  
    res.status(200).json({ message: "User Already Registered" });
  }
});

//Sign In
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).json({ message: "Please SignUp first" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(200).json({ message: "password is incorrect" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Error" });
  }
});

module.exports = router;
