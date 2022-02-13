/** @format */

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const auth = require("../middleware/auth");

// //@route   POST api/users
// //@desc    Register a user
// //@access  Public

// router.get("/", auth, async (req, res) => {
//   try {
//     await User.find(function (err, data) {
//       if (err) return err;
//       res.json(data);
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

//@route   GET api/users
//@desc    Get all users
//@access  Private
router.get('/', auth, async (req, res) => {
    try{
        const users = await User.find({ user: req.user.id }).sort({ date: -1});
        res.json(users);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; //pull it out from the request
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      } else {
        user = new User({
          name,
          email,
          password,
        });

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        //For the web token
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 3600, //for one hour
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token: token, msg: "User Registered" });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
